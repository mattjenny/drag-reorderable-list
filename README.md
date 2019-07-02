# Drag reorderable list

## Link
https://mattj-drag-reorderable-list.herokuapp.com

## Design
This app was built on a React/Typescript stack bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The application renders an ordered list of elements that can be dragged to reorder, renamed, and removed. An add button creates new items to add to the list.

### Design decisions
I chose React as a framework due to its declarative component structure that would allow a reorderable list to be published and shared as a reusable component, and because of the speed of getting an app off the ground and deployed to heroku using create-react-app. In reality the usual biggest draws of React, its performance and virtual DOM rendering, were not the driving factors for an application this simple.

I also added dependencies on BlueprintJS for its icons, styled buttons, and EditableText fields; styled-components for CSS-in-JS; and uuid for simple random id generation.

### Code structure

The "MyComponent" component stores data for the reorderable list in its state, and in a larger and more complex application one can imagine it being replaced by a beefier state management library (e.g. redux), and/or persisted to a back end layer.

The "DragReorderableList" component manages mouse interactions and listeners, and renders the list items in the appropriate locations. This is intended to be the most generic component, and could ideally be used with multiple different list item implementations in the future.

The "DragReorderableListItem" component renders a single list item, including its drag handles and remove button.


## Tradeoffs, shortcomings, and future concerns

First of all, if this were an app designed for a production use case, it should absolutely have unit and integration tests for each of these components.

A couple major shortcomings of this application come from the way that component locations and mouse positions are calculated. Critically, the reorderable list component does not currently account for an offset for the list component itself, so if it is not rendered at the very top of the screen, calculated mouse positions will be wrong. Additionally, this simplified implementation assumes that all child items have a constant height. A more robust implementation would determine the height of each child and calculate the mouse offset based on a sum of heights of elements above a given item in the list. Likewise, the width of dragging elements is set to 100%, and since it's absolutely positioned, it would overlap anything rendered beside the reorderable list on the page. This could be fixed by setting the left and right positions of the dragging element based on the parent component's dimensions.

In order to get a demo up and running in the allotted time, I hard coded titles and colors as two properties of items in the list. In an ideal world where this single reorderable list component was used in multiple use cases, such as the calculator and assignment editor, I would want to make it take in a list of generic data objects, a renderer component, and a default new item. This would allow us to abstract away the content of the list items, and the reusable reorderable list component would only need to worry about the positioning and dragging behaviors of the list elements.

Feature-wise, the next thing I'd want if I were using this component in real life would be selection, and so that's what I would focus on next.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
