# auth-screens
Basic HTML page with modal for authentication forms.
## Usage
Have the aycart module inside other JS files on your website and reference the index.js file from your html file.
The module provides three web components:
  + auth-component: Contains sigin/signup markup
  + side-nav: Side navigation for profile markup
  + ary-controls: Contains the cart component and control buttons for auth-component and side-nav

Place the components as reqular HTML elements, with closing tags. auth-component and side-nav take in a boolean property, open, to controls display.
```
<!DOCTYPE html>
<html leng="en">
  <heade></head>
  <body>
    <auth-component open="false"></auth-component>
    <side-nav open="false"></side-nav>
    <main>
      <ary-controls></ary-controls>
    </main>
  </body>
</html>
```
