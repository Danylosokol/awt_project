let auth2 = {};

function userChanged(user){
    const userInfoElm = document.getElementById("author");
    if(userInfoElm ){
        userInfoElm.value = user.getBasicProfile().getName();
    }
}


function updateSignIn() {
    const sgnd = auth2.isSignedIn.get();
    if (sgnd) {
        document.getElementById("google-signin-button").classList.add("hiddenElm");
        document.getElementById("signout-button").classList.remove("hiddenElm");
        userChanged(auth2.currentUser.get());
    }else{
        document.getElementById("signout-button").classList.add("hiddenElm");
        document.getElementById("google-signin-button").classList.remove("hiddenElm");
    }
    const userInfoElm = document.getElementById("author");
    if(userInfoElm ){
        userInfoElm.value = auth2.currentUser.get().getBasicProfile().getName();
    }

}

function startGSingIn() {
    gapi.load('auth2', function() {
        gapi.signin2.render('google-signin-button', {
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });

        gapi.auth2.init().then(
            function (){
                console.log('init');
                auth2 = gapi.auth2.getAuthInstance();
                /*
                auth2.currentUser.listen(userChanged);
                auth2.isSignedIn.listen(updateSignIn);
                auth2.then(updateSignIn);*/
            });
    });

}

function signOut() {
    if(auth2.signOut){
        auth2.signOut();
    }
    if(auth2.disconnect){
        auth2.disconnect();
    }
    console.log("goodbye");
    document.getElementById("signout-button").classList.add("hiddenElm");
    document.getElementById("google-signin-button").classList.remove("hiddenElm");
}

function onSuccess(googleUser) {
    console.log('Logged in as ' + googleUser.getBasicProfile().getName());
    document.getElementById("google-signin-button").classList.add("hiddenElm");
    document.getElementById("signout-button").classList.remove("hiddenElm");
}
function onFailure(error) {
    console.log(error);
}