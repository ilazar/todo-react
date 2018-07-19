# Todo React App

- [Create Project](#create-project)
- [State and Lifecycle](#state-and-lifecycle)
- [Props and Keys](#props-and-keys)
- [Handling Events](#handling-events)

## Create Project

- Use [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)
- Explore generated project
  - [JSX](https://reactjs.org/docs/introducing-jsx.html)
  - [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
- Use [styled components](https://github.com/styled-components/styled-components)

## State and Lifecycle

- See [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- See [Component API](https://reactjs.org/docs/react-component.html)
  - mounting: `constructor, render, componentDidMount`
  - updating: `render, componentDidUpdate`
  - error handling: `componentDidCatch`
  - cancelling operations & releasing resources: `componentWillUnmount`
- Add `items/ItemList` component
- Use `items/ItemRestClient` to fetch data from server
- Use `core/Loading,ErrorDetail` components

## Props and Keys

- See [Functional Components](https://reactjs.org/docs/components-and-props.html)
- See [List and Keys](https://reactjs.org/docs/lists-and-keys.html)
- Add `items/Item` component
- Pass properties and callbacks from parent components to child components
- Handle events
- [Typecheking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

## Handling Events

- See [Forms - Controlled Components](https://reactjs.org/docs/forms.html)
- See [Handling Events](https://reactjs.org/docs/handling-events.html)
- Add `items/ItemEdit` component
