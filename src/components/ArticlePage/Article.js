import React, {useState, useContext, useEffect} from 'react';
import { firestore } from "../../firebase/index";
import BlogContext from "../../context/Context";
import * as Showdown from "showdown";
import * as sanitizeHtml from "sanitize-html-react";
import AuthorCard from '../MainPage/AuthorCard';
import CommentSection from './CommentSection';
import * as utils from "../../utils/utils.js";
import {withRouter} from 'react-router-dom';
import {Header,Title,ArticleContent,CoverImage,DetailsText,SmallDescription,ShareSection,styles, SmallTag, ShareFacebookButton} from "./Styling/ArticleStyling.js";
import {serializeArticleForShare} from "../../utils/utils";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {SEO} from "../SEO/SEO";
//Markdown converter settings
let converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

const Article = ({history}) => {
    const {state} = useContext(BlogContext);

    const {activePost} = state;
    const [blogContent, setBlogContent] = useState({
        ...activePost,
        content : converter.makeHtml(activePost.content),
        readDuration : utils.calculateReadingTime(activePost.content)
    });

    const displayedTagInfo = JSON.parse(localStorage.getItem("blog_tags"))?.tagList.filter(element => element.name === blogContent.tag)[0] || {color:'', name:''};


    const [scrollHeight, setScrollHeight] = useState(0);   
    const opacity = Math.min(100 / scrollHeight, 1);
    const handleScroll = () => {
          var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
          if(scrollTop<600){
            setScrollHeight(scrollTop);
          }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    const shareResultsToFacebook = () => {
        const params = {
            u : window.location.href,
        }
        const url = `https://www.facebook.com/sharer/sharer.php?${serializeArticleForShare(params)}`;
        return url;
    }

    useEffect(() => {
        window.scrollTo(0,0);
        if(blogContent.id === 0){
            let linkId = utils.getIdFromCustomURL(window.location.href);
            firestore.collection("posts").doc(linkId).get().then(data => {
                   let receivedData = data.data();
                   if(receivedData){
                    setBlogContent({
                        ...receivedData,
                        id : linkId,
                        content:converter.makeHtml(receivedData.content),
                        readDuration : utils.calculateReadingTime(receivedData.content) 
                    });
                    }
                    else{
                        alert("There was an error loading the article data");
                        history.push('/');
                    }
            },() => {
                alert("There was an error loading the article data");
                history.push('/');
            });
        }
    }, [blogContent]);
    
    return(
        <div>
            <SEO
                title={blogContent.title}
                description={blogContent.description}
                image={blogContent.mainCover}
                type={'article'}
                url={`https://blog.robertnc.com/article/${blogContent.id}`}
            />
            <div style={{height:"80px"}}></div>
                <Header>
                    <div>
                        <Title>{blogContent.title}</Title>   
                        <SmallDescription>{blogContent.description}</SmallDescription>
                        <DetailsText>
                            <i>{new Date(blogContent.date).toDateString()} | {blogContent.readDuration} minutes read</i> 
                            <SmallTag color={displayedTagInfo.color}>
                                <i>{displayedTagInfo.name}</i>
                            </SmallTag>
                        </DetailsText>
                        <ShareSection>
                                <ShareFacebookButton href={shareResultsToFacebook()} target="_blank">Share to facebook</ShareFacebookButton>
                        </ShareSection>
                    </div>
                </Header>
            <div>
               <div style={{opacity}}> 
                    <CoverImage src={blogContent.mainCover}></CoverImage>
               </div>
                {blogContent.mainCoverSource !== "" ? 
                    <p style={styles.coverSource}>
                        <small>Illustration : <a style={{color : "#919191"}} href={blogContent.mainCoverSource}>Source</a></small>
                    </p> : null
                }
            </div>
            {utils.splitByCodeTags(blogContent.content).map(d => {
                if(d.type === 'markdown'){
                    return <ArticleContent dangerouslySetInnerHTML={{ __html : sanitizeHtml(d.text,{allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'h1','h2' ])})}}/>
                }
                else if(d.type === 'code'){
                    return(
                        <ArticleContent>
                            <SyntaxHighlighter language={blogContent.lang} style={dracula}>
                                {d.text}
                            </SyntaxHighlighter>
                        </ArticleContent>
                    )
                }
                return null;
            })}

            <div style={styles.footer}>
                <AuthorCard/>
                <br></br>
            </div>
            <CommentSection loggedIn={state.loggedIn} comments={blogContent.comments} postID={blogContent.id} userName={state.loggedUserDisplayName}/>
        </div>
    )
}


export default withRouter(Article);