

function sessions(app){
    //login
    app.post("/api/sessions", (req, res) => {
        const {username, password} = req.body;
        console.log(username);
        console.log(password);

    })
}