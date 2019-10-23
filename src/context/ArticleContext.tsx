import React, { useState, createContext } from 'react'
import { contentMaster } from '../content'

const initContent: Content = contentMaster
const emptyArticle = {
    index: 1,
    title: '',
    text: '',
    img: '',
    sideImg: true

}
export const ArticleContext = createContext<ArticleContextInterface>({
    content: initContent,
    article: emptyArticle,
    tabTitle: '',
    addEditDeleteArticle: () => {
        throw new Error('addEditDeleteArticle() not implemented');
    },
    setArticle: () => {
        throw new Error('setArticle() not implemented');
    },
    changeArticleOrder: () => {
        throw new Error('changeArticleOrder() not implemented');
    },
    editTabTitle: () => {
        throw new Error('editTabTitle() not implemented');
    },
    setTabTitle: () => {
        throw new Error('setTabTitle() not implemented');
    }
});

const ArticleContextProvider = (props: { children: React.ReactNode; }) => {
    const [content, setContent] = useState(initContent)
    const [article, setArticle] = React.useState<Article>(emptyArticle)
    const [tabTitle, setTabTitle] = React.useState<string>('')


    const editTabTitle = (panelTab: PanelTab, tabTitle: string) => {
        const tabs = content.panel.tabs
        var index = tabs.findIndex(tab => tab.index === panelTab.index);
        tabs[index] = {
            ...panelTab,
            tabTitle
        }
        setContent({
            ...content
        })
        console.log('panelTab :', tabs);

    }

    const addEditDeleteArticle = (panelTab: PanelTab, article: Article, action: string) => {
        const { articles } = panelTab
        var index = articles.findIndex(art => art.index === article.index);
        switch (action) {
            case 'edit': if (index !== -1) {
                articles.slice(0, index)
                articles[index] = article
                articles.slice(index + 1)
            }
            else {
                const lastIndex = articles.length + 1
                const updateArticle = { ...article, index: lastIndex }
                articles.push(updateArticle)
            }
                break
            case 'delete':
                articles.splice(index, 1)
                break
        }
        articles.forEach((art, i) => {
            articles.slice(0, i)
            articles[i] = {
                ...art,
                index: i
            }
            articles.slice(i + 1)
        })

        setContent({
            ...content,
        })
    }

    const changeArticleOrder = (panelTab: PanelTab, article: Article, action: string) => {
        const { articles } = panelTab
        var index = articles.findIndex(art => art.index === article.index);
        switch (action) {
            case 'moveUp': if (index !== 0) {
                articles.splice(index - 1, 2, articles[index], articles[index - 1]);
            }
                break
            case 'moveDown':
                if (index !== articles.length - 1) {
                    articles.splice(index, 2, articles[index + 1], articles[index]);
                }
                break
        }
        articles.forEach((art, i) => {
            articles.slice(0, i)
            articles[i] = {
                ...art,
                index: i
            }
            articles.slice(i + 1)
        })
        setContent({
            ...content,
        })
    }

    return (
        <ArticleContext.Provider value={{
            content,
            addEditDeleteArticle,
            article,
            setArticle,
            changeArticleOrder,
            editTabTitle,
            tabTitle,
            setTabTitle
        }}>
            {props.children}
        </ArticleContext.Provider>
    )

}

export default ArticleContextProvider


