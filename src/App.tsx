import React, { useContext } from 'react';
import './App.css';
import Footer from './layout/Footer';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import TabPanel from './layout/TabPanel'
import Hero from './layout/Hero';
import AuthContextProvider from './context/AuthContext';
import { ContentContext } from './context/ContentContext';
import ContentContextProvider from './context/ContentContext';
import { ThemeContext } from './context/ThemeContext';


const RenderWebsite: React.FC<Props> = () => {
  const { content } = useContext(ContentContext)
  const { panel, hero, footer } = content

  return (
    <React.Fragment>
      <Hero hero={hero} />
      <TabPanel panel={panel} />
      <Footer footer={footer} />
    </React.Fragment>
  )
}

interface Props {

}

const App: React.FC = () => {
  const {
    themeState,

  } = useContext(ThemeContext)
  return (
    <div className="App">
      <AuthContextProvider>
        <ContentContextProvider>

          <MuiThemeProvider theme={themeState}>

            <RenderWebsite />
          </MuiThemeProvider>
        </ContentContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;





