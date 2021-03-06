import React, {Component} from 'react'
import injectSheet from 'react-jss'
import moment from 'moment'
import {connect} from 'react-redux'

import Lineup from './components/Lineup'
import Hero from './components/Hero'
import Venue from './components/Venue'
import Countdown from './components/Countdown'
import {startCountDown} from "../../actions";

const styles = theme => ({
    root: {
        overflow: 'hidden',
        zIndex: 1,
        position: 'relative'
    },
    hero: {
        height: '100%',
        backgroundImage: 'url("https://i.ytimg.com/vi/PJKA6qcfQ7Q/maxresdefault.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    overlayImg: {
        height: 'inherit',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    logo: {
        maxWidth: 150,
        height: 'auto'
    }
});

@connect(null, {startCountDown})
@injectSheet(styles)
class Home extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Hero/>
                <Lineup/>
                <Countdown/>
                <Venue/>
            </div>
        )
    };

}

const loadData = () => {
    let eventDate = moment("2018-11-15");
    let currentTime = moment();
    let duration = moment.duration((eventDate - currentTime));
    let initialCountdown = {
        totalDays: Math.floor(duration.asDays()) * 24 * 60 * 60,
        totalHours: duration.hours() * 60 * 60,
        totalMinutes: duration.minutes() * 60,
        totalSeconds: duration.seconds(),
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds()
    };
    return [
        {
            data: initialCountdown,
            func: startCountDown
        }
    ]

};

export default {
    component: Home,
    loadData
}