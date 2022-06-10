export const Layout = (Nav, MainContent, Footer) => {
    return {
        render: () => {
            if (Nav) Nav.render();
            if (MainContent) MainContent.render();
            if (Footer) Footer.render();
        }
    };
};

