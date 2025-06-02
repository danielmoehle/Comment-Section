var upVote = document.getElementById("upVote")
var downVote = document.getElementById("downVote")
var secondUpVote = document.getElementById('secondUpVote')
var secondDownVote = document.getElementById('secondDownVote')
var body = document.getElementById("body")
var replyBtn = document.getElementById("replyBtn")
var secondReplyBtn = document.getElementById("secondReplyBtn")
var firstCommentReplys = document.getElementById("firstCommentContainer")
var secondCommentReplys = document.getElementById("secondCommentContainer")
var postCommentContainer = document.getElementById('postCommentContainer')
var postBtn = document.getElementById("postBtn")
var postText = document.getElementById("postText")



function upvote() {

    var likes = parseInt(this.parentNode.getAttribute("data-likes"))
    var voteState = parseInt(this.parentNode.getAttribute("data-voteState"))
    var totalLikes = this.nextElementSibling

    
    if(this.click) {
        this.style.color = "blue"
        downVote.style.color = "gray"
    }
    if (voteState === 1) {
        // Undo upvote
        if(this.click) {
            this.style.color = "gray"
        }
        likes -= 1;
        this.parentNode.setAttribute('data-voteState', likes)
        this.style.color = "gray"
        totalLikes.innerHTML = likes;
        
        
    } else {
        // Remove downvote if needed, then upvote
        likes += (voteState === -1) ? 2 : 1;
        this.parentNode.setAttribute('data-voteState', '1')
        // console.log(likes)

    }
    this.parentNode.setAttribute("data-likes", likes)
    totalLikes.innerHTML = likes

}

function downvote() {
    var likes = parseInt(this.parentNode.getAttribute("data-likes"))
    var voteState = parseInt(this.parentNode.getAttribute("data-voteState"))
    var totalLikes = this.previousElementSibling

    if(this.click) {
        this.style.color = "blue"
        upVote.style.color = "gray"

    }
    if (voteState === -1) {
        // Undo upvote
        if(this.click) {
            this.style.color = "gray"
        }
        likes += 1;
        this.parentNode.setAttribute('data-voteState', '0')
        this.style.color = "gray"
        
    } else {
        // Remove downvote if needed, then upvote
        likes -= (voteState === 1) ? 2 : 1;
        this.parentNode.setAttribute('data-voteState', '-1')
    }
    this.parentNode.setAttribute("data-likes", likes)
    totalLikes.innerHTML = likes
}

upVote.addEventListener("click", upvote);
downVote.addEventListener("click", downvote)
secondUpVote.addEventListener("click", upvote);
secondDownVote.addEventListener("click", downvote)




function postreply() {
     if(postText.value === "") {
        return
    }

    var postDivMain = document.createElement('div')
    var postDiv = document.createElement('div')
    var postDiv2 = document.createElement('div')
    postDivMain.className = ("postDivMain")
    postDivMain.id = 'postDivMain'
    postDiv.className = ("postHeader")
    postDiv2.className = ("postBody")
    var post = postText.value
    var sendBtn = document.createElement('button')
    var upvoteBtn = document.createElement('button')
    var downvoteBtn = document.createElement('button')
    sendBtn.className = ("replyBtnPost")
    sendBtn.textContent = "Reply"
    var replyImg = document.createElement ("img")
    replyImg.className = ('replyImgPost')
    replyImg.src = "icon-reply.svg"
    upvoteBtn.className = "likeBtns1"
    downvoteBtn.className = "dislikeBtns1"
    upvoteBtn.id = 'postUpVote'
    downvoteBtn.id = 'postDownVote'
    upvoteBtn.textContent = "+"
    downvoteBtn.textContent = "-"
    var deleteBtn = document.createElement('button')
    deleteBtn.className = 'deleteBtnPost'
    deleteBtn.innerHTML = 'Delete'
    var deleteIcon = document.createElement('img')
    deleteIcon.src = "icon-delete.svg"
    deleteIcon.className = 'deleteIcon'
    deleteBtn.prepend(deleteIcon)
    

    postDiv.innerHTML = `<div class="likeBtnsPost" data-voteState="0" data-likes="0">
    
    <p class="totalLikes" id="totalLikes">0</p>
    
    </div>
    <img src='image-juliusomo.png' class="replyProfilePic"><p class="replyName">juliusomo</p>
    <p class="replyTime">Just Now</p>`
    postDiv2.innerHTML = `<p class="replyComment">${post}</p>`



    var likeContainer = postDiv.querySelector('.likeBtnsPost');


    body.appendChild(postDivMain)
    postDivMain.appendChild(postDiv)
    postDiv.appendChild(postDiv2)
    postDiv.appendChild(deleteBtn)
    postDiv.appendChild(sendBtn)
    sendBtn.prepend(replyImg)
    likeContainer.prepend(upvoteBtn, likeContainer.firstChild);
    likeContainer.appendChild(downvoteBtn);
    postText.value = ""
    
    deleteBtn.addEventListener("click", function() {
       if(window.confirm("are you sure you want to delete this comment?")) {
        if (this.parentElement.children[6].dataset.clicked === "true") {
            this.parentElement.parentElement.nextElementSibling.remove()
            this.parentElement.parentElement.remove()
        } else if(this.parentElement.children[6].dataset.clicked !== "true") {
            this.parentElement.parentElement.remove()
        }  else {
            return
        }

        document.querySelector("replyBtn").dataset.clicked = "false";
    }})

    setTimeout(() => {
        sendBtn.addEventListener('click', replyToPost)
        upvoteBtn.addEventListener('click', upvote)
        downvoteBtn.addEventListener('click', downvote)


    }, 0);
 
}

postBtn.addEventListener('click', postreply)





function edit() {
    if (this.dataset.clicked === "true") return;
    this.dataset.clicked = "true";
    var editPost = this.previousElementSibling.children[1].firstChild
    editPost.style.display = "none"
    var textArea = document.createElement("textarea")
    textArea.className = "postText2Test"
    textArea.value = editPost.innerHTML
    var updateBtn = document.createElement("button")
    updateBtn.className = "updateBtn"
    updateBtn.id = 'updateBtn'
    updateBtn.innerHTML = "Update"

    this.previousElementSibling.children[1].append(textArea)

    this.previousElementSibling.children[1].append(updateBtn)
    
    function updatePost(){
        textArea.style.display = "none"
        editPost.style.display = "block"
        editPost.innerHTML = textArea.value
        updateBtn.style.display = "none"
        this.parentNode.parentNode.parentNode.children[1].dataset.clicked = 'false'
    }

    updateBtn.addEventListener('click', updatePost)}


    function replyToPost() {
        if (this.dataset.clicked === "true") return;
        this.dataset.clicked = "true";
        var replyContainer1 = document.createElement('div')
        var replyCommentTopHalf = document.createElement('div')
        var replyCommentText = document.createElement('div')
        var button = document.createElement('button')
        button.className = 'postBtn2'
        button.innerHTML = 'REPLY'
    
    
        replyContainer1.className = "firstComment"
      
        replyCommentTopHalf.className = "postComment2"
       
        replyCommentText.className = "firstReplyComment"
    
        replyCommentTopHalf.innerHTML = `<img src='image-juliusomo.png' class="userPic">
            <textarea id="postText2" class="postText2"></textarea>`
        
        this.parentNode.parentNode.insertAdjacentElement('afterend', replyContainer1)
        replyContainer1.appendChild(replyCommentTopHalf)
        replyCommentTopHalf.appendChild(button)
  
    
        button.addEventListener('click', function() {
            
    
        var replyBox = this.closest('.postComment2');
        var postText2 = replyBox.querySelector('.postText2')
        if (!postText2 || !postText2.value.trim()) return;
        var reply = postText2.value
    
      
    
        var replyContainer = document.createElement('div')
        var replyCommentTopHalf = document.createElement('div')
        var replyCommentText = document.createElement('div')
        replyContainer.id = ('postReplyContainer')
        replyContainer.className = "replyContainer"
        replyCommentTopHalf.className = "replyHeader"
        replyCommentText.className = "replyBody"
        var deleteBtn = document.createElement('button')
        var editBtn = document.createElement('button')
        deleteBtn.className = 'deleteBtn'
        deleteBtn.innerHTML = 'Delete'
        editBtn.id = "editBtn"
        editBtn.className = 'editBtn'
        editBtn.innerHTML = 'Edit'
        var deleteIcon = document.createElement('img')
        var editIcon = document.createElement('img')
        deleteIcon.src = "icon-delete.svg"
        editIcon.src = "icon-edit.svg"
        deleteIcon.className = 'deleteIcon'
        editIcon.className = 'editIcon'
        deleteBtn.prepend(deleteIcon)
        editBtn.prepend(editIcon)
        
    
        replyCommentTopHalf.innerHTML = `<div class="topHalf">
                <div class="likeBtns" data-voteState="0" data-likes="0">
                <button class="likeBtns1" id="replyUpVote">+</button>
                <p class="totalLikes" id="replyLikes">0</p>
                <button class="dislikeBtns1" id="replyDownVote">-</button>
                </div>
                <img src='image-juliusomo.png' class="profilePic">
                <p class="name">juliusomo <span class="ago">Just Now</span></p>
            </div>`
        replyCommentText.innerHTML = `<p class="comment" id="editPost">${reply}</p>`
        
    
        this.parentElement.parentElement.appendChild(replyContainer)
        replyContainer.appendChild(replyCommentTopHalf)
        replyCommentTopHalf.appendChild(replyCommentText)
        replyContainer.appendChild(editBtn)
        replyContainer.appendChild(deleteBtn)
        replyContainer1.className = "smallerReplyContainer"

        this.parentElement.style.display = 'none'
        
        this.parentNode.parentNode.previousElementSibling.children[0].children[0].children[0].addEventListener('click', upvote)
        this.parentNode.parentNode.previousElementSibling.children[0].children[0].children[2].addEventListener('click', downvote)
      
        this.parentElement.nextElementSibling.firstChild.firstChild.children[0].children[2].addEventListener('click', downvote)
        this.parentElement.nextElementSibling.firstChild.firstChild.children[0].children[0].addEventListener('click', upvote)
        
        
       
        this.parentElement.parentElement.children[1].children[1].addEventListener('click', edit)
        this.parentElement.parentElement.children[1].children[2].addEventListener("click", function() {
                if (window.confirm("are you sure you want to delete this comment?")) {
                this.parentElement.parentElement.previousElementSibling.firstChild.children[6].dataset.clicked = "false"
                replyContainer.remove()
                replyContainer1.remove()
                } else {
                    return
                }
            })

        
    
    })
    }
    



replyBtn.addEventListener('click', function(){
    if (this.dataset.clicked === "true") return;
    this.dataset.clicked = "true";
    

    var replyContainer1 = document.createElement('div')
    var replyCommentTopHalf = document.createElement('div')
    var replyCommentText = document.createElement('div')
    var button = document.createElement('button')
    button.className = 'postBtn2'
    
    button.innerHTML = 'REPLY'


    replyContainer1.className = "firstComment"
    replyCommentTopHalf.className = "postComment2"
    
    replyCommentText.className = "firstReplyComment"

    replyCommentTopHalf.innerHTML = `<img src='image-juliusomo.png' class="userPic">
        <textarea id="postText2" class="postText2"></textarea>`

    firstCommentReplys.appendChild(replyContainer1)
    replyContainer1.appendChild(replyCommentTopHalf)
    replyCommentTopHalf.appendChild(button)
    replyContainer1.appendChild(replyCommentText)

    button.addEventListener('click', function() {

    var replyBox = this.closest('.postComment2');
    var postText2 = replyBox.querySelector('.postText2')
    if (!postText2 || !postText2.value.trim()) return;
    var reply = postText2.value

    var replyContainer = document.createElement('div')
    var replyCommentTopHalf = document.createElement('div')
    var replyCommentText = document.createElement('div')
    replyContainer.className = "replyContainer"
    replyCommentTopHalf.className = "replyHeader"
    replyCommentText.className = "replyBody"
    var deleteBtn = document.createElement('button')
    var editBtn = document.createElement('button')
    deleteBtn.className = 'deleteBtn'
    deleteBtn.innerHTML = 'Delete'
    editBtn.id = "editBtn"
    editBtn.className = 'editBtn'
    editBtn.innerHTML = 'Edit'
    var deleteIcon = document.createElement('img')
    var editIcon = document.createElement('img')
    deleteIcon.src = "icon-delete.svg"
    editIcon.src = "icon-edit.svg"
    deleteIcon.className = 'deleteIcon'
    editIcon.className = 'editIcon'
    deleteBtn.prepend(deleteIcon)
    editBtn.prepend(editIcon)

    replyCommentTopHalf.innerHTML = `<div class="topHalf">
            <div class="likeBtns" data-voteState="0" data-likes="0">
            <button class="likeBtns1" id="replyUpVote">+</button>
            <p class="totalLikes" id="replyLikes">0</p>
            <button class="dislikeBtns1" id="replyDownVote">-</button>
            </div>
            <img src='image-juliusomo.png' class="profilePic">
            <p class="name">juliusomo <span class="ago">Just Now</span></p>
        </div>`
    replyCommentText.innerHTML = `<p class="comment" id="editPost">${reply}</p>`



    setTimeout(() => {
        var replyUpVote = document.querySelector("#replyUpVote");
        var replyDownVote = document.querySelector("#replyDownVote")
        replyUpVote.addEventListener('click', upvote)
        replyDownVote.addEventListener('click', downvote)
    }, 0);



    
    replyContainer.appendChild(replyCommentTopHalf)
    replyCommentTopHalf.appendChild(replyCommentText)
    replyContainer.appendChild(editBtn)
    replyContainer.appendChild(deleteBtn)
    firstCommentReplys.appendChild(replyContainer)
    document.querySelector('.postComment2').style.display = "none"


    postText2.value = ""

    deleteBtn.addEventListener("click", function() {
        if (window.confirm("are you sure you want to delete this comment?")) {
        document.getElementById("replyBtn").dataset.clicked = "false";
        replyContainer.remove()
        replyContainer1.remove()
        } else {
            return
        }
    })

    editBtn.addEventListener("click", edit)
       
    })
})





secondReplyBtn.addEventListener('click', function(){
    if (this.dataset.clicked === "true") return;
    this.dataset.clicked = "true";

    var replyContainer1 = document.createElement('div')
    var replyCommentTopHalf = document.createElement('div')
    var replyCommentText = document.createElement('div')
    var button = document.createElement('button')
    button.className = 'postBtn2'
    
    button.innerHTML = 'REPLY'


    replyContainer1.className = "firstComment"
    replyCommentTopHalf.className = "postComment2"
   
    replyCommentText.className = "firstReplyComment"

    replyCommentTopHalf.innerHTML = `<img src='image-juliusomo.png' class="userPic">
        <textarea id="postText2" class="postText2"></textarea>`

    secondCommentReplys.appendChild(replyContainer1)
    replyContainer1.appendChild(replyCommentTopHalf)
    replyCommentTopHalf.appendChild(button)
    replyContainer1.appendChild(replyCommentText)

    button.addEventListener('click', function() {
 
    var replyBox = this.closest('.postComment2');
    var postText2 = replyBox.querySelector('.postText2')
    if (!postText2 || !postText2.value.trim()) return;
    var reply = postText2.value

    var replyContainer = document.createElement('div')
    var replyCommentTopHalf = document.createElement('div')
    var replyCommentText = document.createElement('div')
    replyContainer.className = "replyContainer"
    replyCommentTopHalf.className = "replyHeader"
    replyCommentText.className = "replyBody"
    var deleteBtn = document.createElement('button')
    var secondEditBtn = document.createElement('button')
    deleteBtn.className = 'deleteBtn'
    deleteBtn.innerHTML = 'Delete'
    secondEditBtn.id = 'secondEditBtn'
    secondEditBtn.className = 'editBtn'
    secondEditBtn.innerHTML = 'Edit'
    var deleteIcon = document.createElement('img')
    var editIcon = document.createElement('img')
    deleteIcon.src = "icon-delete.svg"
    editIcon.src = "icon-edit.svg"
    deleteIcon.className = 'deleteIcon'
    editIcon.className = 'editIcon'
    deleteBtn.prepend(deleteIcon)
    secondEditBtn.prepend(editIcon)

    replyCommentTopHalf.innerHTML = `<div class="topHalf">
            <div class="likeBtns" data-voteState="0" data-likes="0">
            <button class="likeBtns1" id="replyUpVote">+</button>
            <p class="totalLikes" id="replyLikes">0</p>
            <button class="dislikeBtns1" id="replyDownVote">-</button>
            </div>
            <img src='image-juliusomo.png' class="profilePic">
            <p class="name">juliusomo <span class="ago">Just Now</span></p>
        </div>`
    replyCommentText.innerHTML = `<p class="comment" id="editPost">${reply}</p>`




    setTimeout(() => {
        var replyUpVote = document.querySelector("#replyUpVote");
        var replyDownVote = document.querySelector("#replyDownVote")
        replyUpVote.addEventListener('click', upvote)
        replyDownVote.addEventListener('click', downvote)
    }, 0);



    

    replyContainer.appendChild(replyCommentTopHalf)
    replyCommentTopHalf.appendChild(replyCommentText)
    replyContainer.appendChild(secondEditBtn)
    replyContainer.appendChild(deleteBtn)
    secondCommentReplys.appendChild(replyContainer)
    this.closest('.postComment2').style.display = "none"

    

    postText2.value = ""

    deleteBtn.addEventListener("click", function() {
        if (window.confirm("are you sure you want to delete this comment?")) {
        document.getElementById("secondReplyBtn").dataset.clicked = "false";
        replyContainer.remove()
        replyContainer1.remove()
        } else {
            return
        }
    })

        
    secondEditBtn.addEventListener("click", edit)

    })
})


 




