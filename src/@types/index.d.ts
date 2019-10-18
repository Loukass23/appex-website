
/**
 * USER
 */
interface User {
    name: string,
    surname: string,
    avatar: string,
    isAdmin: Boolean
}
interface MaterialIcons {
    favorite: JSX.Element,
    home: JSX.Element,
    contact: JSX.Element,
    phone: JSX.Element,
    person: JSX.Element,
    flight: JSX.Element,
    house: JSX.Element,
    like: JSX.Element,
    dislike: JSX.Element,
    shop: JSX.Element,
    help: JSX.Element,
}
/**
 * LAYOUT
 */
interface Footer {
    title: String,
    text: String,
    copyright: String,
}
interface Hero {
    title: String,
    text: String,
    img: string,
    logo: string,
    parallax: Boolean
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

interface Panel {
    tabs: PanelTabs
}

type PanelTabs = Array<any>

interface PanelTab {
    tabName: string,
    tabTitle: string,
    articles: Articles,
    tabType: string,
    icon: keyof MaterialIcons,
    contact: Contact
}

type Articles = Array<Article>

interface Article {
    index: number,
    title: string,
    text: string,
    img: string,
    sideImg: boolean

}
interface Contact {
    name: string,
    surname: string,
    phone: string,
    email: string,
    address: string
}


/**
 * CONTEXT
 */

interface AuthContextInterface {
    isAuthenticated: Boolean,
    user: User
}
interface ContentContextInterface {
    content: Content,
    addEditArticle: any,
    article: Article,
    setArticle: any
}


/**
 * CONTENT
 */
interface Content {
    color: {
        primary: string,
        secondary: string
    },
    hero: {
        title: string,
        text: string,
        img: string,
        logo: string,
        parallax: Boolean
    },
    panel: Panel


    footer: {
        title: string,
        text: string,
        copyright: string

    },

}