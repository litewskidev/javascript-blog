'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.list .tags';


function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Article was clicked!', event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}


function generateTitleLinks(customSelector = ''){
  console.log('Custom Selector', customSelector);
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);

  let html = '';

  for(let article of articles){
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* [DONE] insert link into html variable */
    html = html + linkHTML;
    console.log(html);
  }
  /* [DONE] insert link into titleList */
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


function generateTags(){
  /* [DONE] create a new variable allTags with an empty array */
  let allTags = [];
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('Tags:', articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for(let TagArray of articleTagsArray){
      /* [DONE] generate HTML of the link */
      const linkHTML = ' <li><a href="#tag-' + TagArray + '"><span>' + TagArray + '</span></a></li>';
      console.log('HTML Link:', linkHTML);
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      /* [DONE] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [DONE] add generated code to allTags array */
        allTags.push(linkHTML);
      }
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('Tags Wrapper:', tagsWrapper);
  /* [DONE] END LOOP: for every article: */
  }
  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [DONE] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
}

generateTags();


function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!', event);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Href:', href);
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('Tag:', tag);
  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [DONE] START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* [DONE] remove class active */
    activeTag.classList.remove('active');
    console.log(activeTag);
  /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* [DONE] add class active */
    tagLink.classList.add('active');
  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* [DONE] START LOOP: for each link */
  for(let linkToTags of linksToTags){
    /* [DONE] add tagClickHandler as event listener for that link */
    linkToTags.addEventListener('click', tagClickHandler);
  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToTags();


function generateAuthors(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get authors from data-authors attribute */
    const author = article.getAttribute('data-author');
    console.log(author);
    /* [DONE] generate HTML of the link */
    const linkHTML = '<li><a href="#aut-' + author + '"><span>' + author + '</span></a></li>';
    console.log(linkHTML);
    /* [DONE] add generated code to html variable */
    html = html + linkHTML;
    /* [DONE] insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = html;
  /* [DONE] END LOOP: for every article: */
  }
}

generateAuthors();


function authorClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked!', event);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Href:', href);
  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#aut-', '');
  console.log('Author:', author);
  /* [DONE] find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#aut-"]');
  /* [DONE] START LOOP: for each active author link */
  for(let activeAuthor of activeAuthors){
    /* [DONE] remove class active */
    activeAuthor.classList.remove('active');
    console.log(activeAuthor);
  /* [DONE] END LOOP: for each active author link */
  }
  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found author link */
  for(let authorLink of authorLinks){
    /* [DONE] add class active */
    authorLink.classList.add('active');
  /* [DONE] END LOOP: for each found author link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){
  /* [DONE] find all links to authors */
  const linksToAuthors = document.querySelectorAll('a[href^="#aut-"]');
  /* [DONE] START LOOP: for each link */
  for(let linkToAuthors of linksToAuthors){
    /* [DONE] add authorClickHandler as event listener for that link */
    linkToAuthors.addEventListener('click', authorClickHandler);
  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToAuthors();
