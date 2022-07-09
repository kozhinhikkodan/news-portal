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
                        
                        articles = result.articles.map((ele: { source: any; author: string; title: string; description: string; url: string; urlToImage: string; publishedAt: string; }) => {
                            return {
                                source: ele.source.name,
                                author: ele.author,
                                title: ele.title,
                                description: ele.description,
                                url: ele.url,
                                urlToImage: ele.urlToImage,
                                publishedAt: Date.parse(ele.publishedAt),
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
                        articles = result.articles.map((ele: { source: any; author: string; title: string; description: string; url: string; urlToImage: string; publishedAt: string; }) => {
                            return {
                                source: ele.source.name,
                                author: ele.author,
                                title: ele.title,
                                description: ele.description,
                                url: ele.url,
                                urlToImage: ele.urlToImage,
                                publishedAt: Date.parse(ele.publishedAt),
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