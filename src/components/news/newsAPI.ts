import axios from "axios";
import { Article } from "./newsSlice";

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

// fetching news data from with our parameters from newsapi.org

export function fetchNewsWithQuery(query: string, language: string, page: number) {

    return new Promise<{ data: Array<Article>, page: number }>((resolve, reject) => {
        axios.get(`https://newsapi.org/v2/everything?q=${query}&language=${language}&pageSize=10&page=${page}&apiKey=${newsApiKey}`)
            .then(
                (result) => {
                    console.log(result);
                    var articles = [];
                    if (result.data.totalResults > 0) {
                        
                        articles = result.data.articles.map((article: { source: any; author: string; title: string; description: string; url: string; urlToImage: string; publishedAt: string; }) => {
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
                        reject(new Error("No news matching your search"))
                    }
                },
                (error) => {
                    reject(new Error("Could not retrieve the data"))
                }
            )
    }
    );
}

// fetching popular news data from with our parameters from newsapi.org

export function fetchNewsByPopularity(language: string, page: number) {

    return new Promise<{ data: Array<Article>, page: number }>((resolve, reject) => {
        fetch(`https://newsapi.org/v2/top-headlines?language=${language}&page=${page}&apiKey=${newsApiKey}&pageSize=8`)
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