const users = []
window.onload = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
            return res.json()
        })
        .then((_users) => {
            users.push(..._users);
            loadFeed()
        })
};

async function getComments() {
    let comments = await fetch('https://jsonplaceholder.typicode.com/comments')
    let result = await comments.json();
    return result
};

let feedDiv;
async function loadFeed() {
    feedDiv = document.createElement("div");
    feedDiv.classList.add("main");
    document.body.append(feedDiv);
    let coms = await getComments();
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            return response.json()
        })
        .then((posts) => {
            const fragment = new DocumentFragment();
            posts.forEach((post) => {  // sax userneri vrayov fracinq,en user id vorn vor ham@nkav mer post user id-in return exav
                const user = users.find((user) => {
                    return user.id == post.userId;
                })
                if (user) {
                    post.userName = user.name;
                }

                //Amen postin avelacrinq ir comentnery
                const com = coms.filter((com) => {
                    return com.postId == post.id;
                })
                if (com) {
                    post.postComments = com
                }


                fragment.append(createFeedItem(post));
            })
            feedDiv.append(fragment);
            feedDiv.addEventListener('click', (event) => {
                const div = event.target.closest("[postId]")
                comDivFn(posts[div.getAttribute("postID") - 1]);
            });
        })
}


function createFeedItem(post) {
    const innerHTML = `<h1 class="userName">${post.userName}</h1>
    <h3 class="title">${post.title}</h3>
    <span class="body">${post.body}</span>`

    const div = document.createElement("div")
    div.setAttribute("postId", post.id)
    div.classList.add("postDiv");
    div.innerHTML = innerHTML;
    return div
}

function comDivFn(posts) {
    document.body.style.background = "yellow";
    console.log(posts);
    const innerHTML2 = `<h1 class="userName">${posts.userName}</h1>
    <h2 class="title">${posts.title}</h2>
    <h4 class="body">${posts.body}.</h4>`;

    const innerCOMS1 = `<h5 class="h5">${posts.postComments[0].email}</h5>
    <h5 class="text">${posts.postComments[0].name}</h5>
    <p class="text2">${posts.postComments[0].body}.</p>`

    const innerCOMS2 = `<h5 class="h5">${posts.postComments[1].email}</h5>
    <h5 class="text">${posts.postComments[1].name}</h5>
    <p class="text2">${posts.postComments[1].body}.</p>`

    const innerCOMS3 = `<h5 class="h5">${posts.postComments[2].email}</h5>
    <h5 class="text">${posts.postComments[2].name}</h5>
    <p class="text2">${posts.postComments[2].body}.</p>`

    const innerCOMS4 = `<h5 class="h5">${posts.postComments[3].email}</h5>
    <h5 class="text">${posts.postComments[3].name}</h5>
    <p class="text2">${posts.postComments[3].body}.</p>`

    const innerCOMS5 = `<h5 class="h5">${posts.postComments[4].email}</h5>
    <h5 class="text">${posts.postComments[4].name}</h5>
    <p class="text2">${posts.postComments[4].body}.</p>`
    feedDiv.remove();
    let clickDiv = document.createElement("div");
    clickDiv.classList.add("clickDiv");

    let contentDiv = document.createElement("div");
    contentDiv.classList.add("contentDiv");
    contentDiv.innerHTML = innerHTML2;
    clickDiv.append(contentDiv);

    let commDiv = document.createElement("div");
    commDiv.classList.add("commDiv");
    clickDiv.append(commDiv);

    let numDiv = document.createElement("div");
    numDiv.classList.add("numDiv");
    numDiv.innerHTML = posts.id;
    contentDiv.append(numDiv);
    document.body.append(clickDiv);

    let back = document.createElement("div");
    back.classList.add("back");
    contentDiv.append(back); 1

    let smallDiv1 = document.createElement("div");
    smallDiv1.classList.add("smallDiv");
    smallDiv1.classList.add("smallDivTitle");
    smallDiv1.innerHTML = "COMMENTS"
    commDiv.append(smallDiv1);

    let smallDiv2 = document.createElement("div");
    smallDiv2.classList.add("smallDiv");
    smallDiv2.innerHTML = innerCOMS1;
    commDiv.append(smallDiv2);

    let smallDiv3 = document.createElement("div");
    smallDiv3.classList.add("smallDiv");
    smallDiv3.innerHTML = innerCOMS2;
    commDiv.append(smallDiv3);

    let smallDiv4 = document.createElement("div");
    smallDiv4.classList.add("smallDiv");
    smallDiv4.innerHTML = innerCOMS3;
    commDiv.append(smallDiv4);

    let smallDiv5 = document.createElement("div");
    smallDiv5.classList.add("smallDiv");
    smallDiv5.innerHTML = innerCOMS4;
    commDiv.append(smallDiv5);

    let smallDiv6 = document.createElement("div");
    smallDiv6.classList.add("smallDiv");
    smallDiv6.innerHTML = innerCOMS5;
    commDiv.append(smallDiv6);

    let form = document.createElement("form");
    contentDiv.append(form);

    let comentInput = document.createElement("input");
    comentInput.classList.add("input");
    comentInput.placeholder = "Թողնել Մեկնաբանություն..."
    form.append(comentInput);

    let button = document.createElement("button");
    button.type = "button";
    button.classList.add("button")
    form.append(button);

    let imp1;
    let imp2;
    let imp3;
    comentInput.addEventListener("click", () => {
        let ancetDiv = document.createElement("div");
        ancetDiv.classList.add("ancetDiv");
        contentDiv.append(ancetDiv);

        let form2 = document.createElement("form");
        form2.classList.add("form2")
        ancetDiv.append(form2);

        imp1 = document.createElement("input");
        imp1.classList.add("input2");
        imp1.placeholder = "Գրեք ձեր անունը..."
        form2.append(imp1);

        imp2 = document.createElement("input");
        imp2.classList.add("input2");
        imp2.placeholder = "Գրեք ձեր Ազգանունը..."
        form2.append(imp2);

        imp3 = document.createElement("input");
        imp3.type = "email"
        imp3.classList.add("input2");
        imp3.placeholder = "Գրեք email..."
        form2.append(imp3);
    }, { once: true })

    let helpsDiv = document.createElement("div");
    helpsDiv.classList.add("helpsdiv");
    contentDiv.append(helpsDiv);
    let help1 = document.createElement("div");
    help1.classList.add("help1")
    help1.append("Մուտքագրեք ձեր անունը!");
    let help2 = document.createElement("div");
    help2.classList.add("help1")
    help2.append("Անունը պետք է լինի ամենաքիչը 4 տառ!");
    let help3 = document.createElement("div");
    help3.classList.add("help2");
    help3.append("Մուտքագրեք ձեր ազգանունը!");
    let help4 = document.createElement("div");
    help4.classList.add("help2");
    help4.append("Ազգնունը պետք է լինի ամենաքիչը 4 տառ!");

    let once = false;
    button.addEventListener("click", () => {
        helpsDiv.innerHTML = ""
        console.log(imp1.value);
        if (!imp1.value) {
            helpsDiv.style.display = "flex"
            helpsDiv.append(help1);
        }
        else if (imp1.value.length < 4) {
            helpsDiv.style.display = "flex"
            helpsDiv.append(help2);
        };
        if (!imp2.value) {
            helpsDiv.style.display = "flex"
            helpsDiv.append(help3)
        } else if (imp2.value.length < 4) {
            helpsDiv.style.display = "flex"
            helpsDiv.append(help4)
        };
        if(imp1.value && imp2.value && imp1.value.length > 3 && imp2.value.length > 3) {
            once = true;
            helpsDiv.remove();
           let myCom = document.createElement("div");
            myCom.classList.add("myCom");
            myCom.innerHTML = `<h1 class="userName">${imp3.value}</h1>
            <h2 class="title">${imp1.value + imp2.value}</h2>
            <h4 class="body">${comentInput.value}.</h4>`;
            
            let commDiv2 = document.createElement("div");
            commDiv2.classList.add("commDiv2");
            commDiv2.append(myCom);
            contentDiv.append(commDiv2)
        }
    },{once: once})

    back.addEventListener("click", () => {
        clickDiv.remove();
        loadFeed();
    })
}


