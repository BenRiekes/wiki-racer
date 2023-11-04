
type Article = {
    title: string;
    body: string;
    url: string;
    links: string[];
}
    
type PlayerState = {
currentArticle: Article;
history: Article[];
}
  

function Play () {

    return (
        <div>Play</div>
    )
}

export default Play; 