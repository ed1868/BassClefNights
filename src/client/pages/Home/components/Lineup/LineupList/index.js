import React, {Component, Fragment} from 'react'
import injectSheet from 'react-jss'

import lineupList from "./data";

const animation = (name, property, from, to) => {
    return {
        [`@keyframes ${name}`]: {
            from: `${property}: ${from}`,
            to: `${property}: ${to}`
        }
    }
};

const fadeIn = animation('fadeIn', 'opacity', 0, 1);
const fadeOut = animation('fadeOut', 'opacity', 1, 0);
const zoomIn = animation('zoom', 'transform', 'scale(1)', 'scale(1.5)');

const styles = theme => ({
    listContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
        alignItems: 'center',
        maxWidth: '100%',
        margin: 'auto'
    },
    listContainerMobile: {
        display: 'none'
    },
    list: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        right: '50%',
        width: '50%',
        height: 450,
        backgroundColor: '#fff',
        zIndex: 4,
        boxShadow: theme.shadows[10]
    },
    listMobile: {
        listStyleType: 'none',
        padding: 0,
        margin: 0
    },
    listItem: {
        padding: '20',
        paddingRight: 30,
        paddingLeft: 0,
        position: 'relative',
        left: 21,
        textAlign: 'right',
        cursor: 'pointer',
        fontFamily: theme.font.secondary,
        letterSpacing: 2,
        fontSize: '1.3em',
        fontWeight: 300,
        borderRight: '1px solid rgba(0,0,0,0.2)',
        '&:hover': {
            borderRight: '1px solid #000 !important'
        }
    },
    listItemImage: {
        position: 'relative',
        minHeight: 500,
        width: '60%',
        minWidth: '600px'
    },
    listItemImageBackground: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0,
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        animationFillMode: 'forwards'
    },
    listItemMobile: {
        fontWeight: 300,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
    },
    overlayMobile: {
        ...theme.flex.colCenter,
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 3,
        '& *': {
            color: '#fff',
            textAlign: 'center',
            cursor: 'pointer',
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: 2,
            fontSize: '1.3em',
            width: '90%'
        }
    },
    ...fadeIn,
    ...fadeOut,
    ...zoomIn,
    '@media (max-width: 942px)': {
        listContainer: {
            display: 'none'
        },
        listContainerMobile: {
            display: 'block'
        }
    },
    '@media (min-width: 501px) and (max-width: 941px)': {
        listContainer: {
            display: 'none'
        },
        listMobile: {
            display: 'flex',
            flexFlow: 'row wrap',
            flexBasis: '50%',
            ...theme.flex.rowBetween
        },
        listItemMobile: {
            minHeight: 'calc(100vw*0.49 - 30px)',
            maxWidth: '50%',
            minWidth: '49.5%',
            margin: '0.5% 0',
        }
    },
    '@media (max-width: 500px)': {
        listItemMobile: {
            margin: '0',
            marginBottom: 3,
            minWidth: '100%',
            minHeight: 275
        }
    }
});

class LineupList extends Component {
    state = {
        activeIndex: 0,
        previousActiveIndex: ''
    };

    startShow = setInterval(() => {
        let {activeIndex} = this.state;
        this.setState({
            previousActiveIndex: JSON.stringify(activeIndex),
            activeIndex: activeIndex >= lineupList.length - 1 ? 0 : activeIndex + 1
        })
    }, 4000);

    nextArtist = (i) => {
        clearInterval(this.startShow);
        let {activeIndex} = this.state;
        this.setState({
            previousActiveIndex: JSON.stringify(activeIndex),
            activeIndex: i
        })
    };

    render() {
        const {classes} = this.props;
        const {activeIndex, previousActiveIndex} = this.state;
        return (
            <Fragment>
                <div className={classes.listContainer}>
                    <ul className={classes.list} style={{paddingRight: 40}}>
                        {lineupList.map((artist, i) => {
                            let active = activeIndex === i;
                            return (
                                <li style={{
                                    borderRight: active ? '1px solid #000' : '1px solid rgba(0,0,0,0.2)',
                                    marginRight: 20
                                }}
                                    onClick={() => this.nextArtist(i)}
                                    className={classes.listItem}
                                    key={artist.name}>
                                    {active && <img src="images/logoFilled.png" alt=""
                                                    style={{
                                                        maxWidth: 20,
                                                        height: 20,
                                                        bottom: -2,
                                                        position: 'relative',
                                                        marginRight: 10
                                                    }}/>}
                                    {artist.name}
                                </li>
                            )
                        })}
                    </ul>
                    <div className={classes.listItemImage}>
                        {lineupList.map((artist, i) => {
                            let active = activeIndex === i;
                            let previousActive = previousActiveIndex === JSON.stringify(i);
                            let firstTime = !!previousActiveIndex;
                            let animation = !firstTime ? activeIndex === i && {opacity: 1}
                                : active ? {opacity: 1, animation: 'fadeIn 1s linear'}
                                    : previousActive ? {opacity: 0, animation: 'fadeOut 1s linear'} : '';
                            return (
                                <div style={{
                                    backgroundImage: `url("${artist.image}")`,
                                    ...animation
                                }}
                                     className={classes.listItemImageBackground}
                                     key={artist.name}>
                                    <div className={classes.overlayMobile}/>
                                </div>
                            )
                        })

                        }
                    </div>
                </div>
                <div className={classes.listContainerMobile}>
                    <ul className={classes.listMobile}>
                        {lineupList.map((artist, i) => {
                            return (
                                <li style={{
                                    backgroundImage: `url("${artist.image}")`
                                }}
                                    className={classes.listItemMobile}
                                    key={artist.name}>
                                    <div className={classes.overlayMobile}>
                                        <div>{artist.name}</div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </Fragment>
        )
    };
}

export default injectSheet(styles)(LineupList)