import React from 'react'

export default class Header extends React.Component {
    static navigationOptions = {
      // headerTitle instead of title
    //   headerTitle: <LogoTitle />,
    };

    Render() {
        return this.props.children
    }
}