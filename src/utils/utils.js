export const calculateReadingTime = (text) => {
    return Math.ceil(text.split(' ').length/200);
};

export const getIdFromCustomURL = (url) => {
    let baseIndex = url.indexOf("article");
    baseIndex+=8;

    //Remove the fbclidID id when opening a link shared from facebook
    const questionSeparatorIndex = url.indexOf("?");
    return questionSeparatorIndex !== -1 ? url.slice(baseIndex, questionSeparatorIndex) : url.slice(baseIndex);
};

export const getCurrentDateTime = () => {
    let today = new Date();
    let date = today.toDateString();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    return dateTime;
};

export const serializeArticleForShare = (params) => {
    return Object.keys(params)
    .map(param => `${param}=${encodeURIComponent(params[param].trim())}`)
    .join("&");   
};

export const splitByCodeTags = (source) => {
    let clonedSource = source;
    let splitData = [];

    const tagLength = "</code></pre>".length;

    if(clonedSource){
        while(clonedSource){
            const indexStart = clonedSource.indexOf("<pre><code>");
            const indexEnd = clonedSource.indexOf("</code></pre>");  
            
            if(indexEnd === -1 || indexStart === -1){
                splitData.push({
                    text : clonedSource,
                    type : 'markdown'
                });
                clonedSource = '';
            }
            
            else{
                splitData.push({
                    text : clonedSource.substring(0,indexStart),
                    type : 'markdown'
                });

                let codeSnippet = clonedSource.substring(indexStart+tagLength-2,indexEnd);

                // Temporary fix for wrong < or > symbols.
                codeSnippet = codeSnippet.replace(/&gt;/g, '>').replace(/&lt;/g,'<');
             
                splitData.push({
                    text : codeSnippet,
                    type : 'code'
                });
    
                clonedSource = clonedSource.substring(indexEnd+tagLength);
            } 
        }
    }

    return splitData;
}