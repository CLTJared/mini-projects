//Jared Elliott - Bootcamp Course - Winter 2023-2024
//Collection of functions wrote over time of bootcamp that I find useful and will re-use

function createLinkElement(linkURL, linkText, linkTarget, linkClass) {
    //Creates an a tag element with information passed
    //linkURL is REQUIRED to function
    //If undefined, linkText will be equal to linkURL | linkTarget will be _self | linkClass will be left alone

    let aElement = document.createElement('a');

    if(!linkText) { linkText = linkURL; } //Sets linkText to linkURL if left blank
    if(!linkURL) {console.log('Function: createLinkElement | URL Link is REQUIRED.'); return; }
    if(!linkTarget) { linkTarget = '_self'; } //Sets linkTarget to _self if left blank
    if(!linkClass) {console.log('Function: createLinkElement | No class provided'); }

    if(typeof linkText !== 'string' || typeof linkURL !== 'string' || typeof linkTarget !== 'string') { console.log("Function: createLinkElement | Only pass strings to function."); return; }
    if(typeof linkClass !== 'string' && typeof linkClass !== 'undefined') { return; }
  
      aElement.textContent = linkText;
      aElement.href = linkURL;
      aElement.setAttribute('target', linkTarget);
      aElement.className(linkClass);
  
    return aElement; //returns the aElement that can be appended to another html element
  }