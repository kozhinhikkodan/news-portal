import { Article } from "./newsSlice";

const apiKey = process.env.REACT_APP_NEWS_API_KEY;

// Function to fetch news data from NewsAPI.org with query parameters
export function fetchNewsWithQuery(query: string, language: string, page: number) {

    return new Promise<{ data: Array<Article>, page: number }>((resolve, reject) => {
        fetch(`https://newsapi.org/v2/everything?q=${query}&language=${language}&page=${page}&apiKey=${apiKey}&pageSize=8`)
            .then(res => res.json())
            .then(
                (result) => {
                    var articles = [];
                    if (result.totalResults > 0) {
                        
                        articles = result.articles.map((article: { source: any; author: string; title: string; description: string; url: string; urlToImage: string; publishedAt: string; }) => {
                            return {
                                source: article.source.name,
                                author: article.author,
                                title: article.title,
                                description: article.description,
                                url: article.url,
                                urlToImage: article.urlToImage,
                                publishedAt: Date.parse(article.publishedAt),
                            }
                        });
                        resolve({ data: articles, page: page })
                    } else {
                        reject(new Error("Not news matching query"))
                    }
                },
                (error) => {
                    reject(new Error("Could not retrieve news"))
                }
            )
    }
    );
}

// Function to fetch popular news data from NewsAPI.org with provided language
export function fetchNewsByPopularity(language: string, page: number) {

    return new Promise<{ data: Array<Article>, page: number }>((resolve, reject) => {
        fetch(`https://newsapi.org/v2/top-headlines?language=${language}&page=${page}&apiKey=${apiKey}&pageSize=8`)
            .then(res => res.json())
            .then(
                (result) => {
                    var articles = [];
                    if (result.totalResults > 0) {
                        articles = result.articles.map((article: { source: any; author: string; title: string; description: string; url: string; urlToImage: string; publishedAt: string; }) => {
                            return {
                                source: article.source.name,
                                author: article.author,
                                title: article.title,
                                description: article.description,
                                url: article.url,
                                urlToImage: article.urlToImage,
                                publishedAt: Date.parse(article.publishedAt),
                            }
                        });
                        resolve({ data: articles , page: page})
                    } else {
                        reject(new Error("No news retrieved"))
                    }
                },
                (error) => {
                    reject(new Error("Could not retrieve data"))
                }
            )
    }
    );
}