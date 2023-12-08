
/**
 * 
 * home page
 */
exports.homepage = async (req, res) => {
    
        const locals ={
            title: 'NodeJS',
            description: "notes app using nodejs"
        }
       
    res.render('index', { 
        locals,
    layout: '../views/layouts/front-page'});
}

/**
 * 
 * about page
 */
exports.about = async (req, res) => {
    
    const locals ={
        title: 'About NodeJS',
        description: "notes app using nodejs"
    }
   
res.render('about', locals);
}

/**
 * 
 * contact page
 */
exports.contact = async (req, res) => {
    
    const locals ={
        title: 'contact us',
        description: "notes app using nodejs"
    }
   
res.render('contact', locals);
}
