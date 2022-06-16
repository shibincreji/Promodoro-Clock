class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            stage: 'Session',
            minutes: '25',
            seconds: '00',
            sessionLength: '25',
            breakLength: '5'
        };
        this.handleStartStop = this.handleStartStop.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleSessionLength = this.handleSessionLength.bind(this)
        this.handleBreakLength = this.handleBreakLength.bind(this)
        this.audio = React.createRef()
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() { //main clock function
        if (this.state.seconds == "00" && this.state.minutes > 10) {
            this.setState((state) => ({
                minutes: state.minutes - 1,
                seconds: 59 //minute change
            }))
        } else if (this.state.seconds == "00" && this.state.minutes <= 10) {
            if (this.state.minutes == "00" && this.state.stage == 'Session') { //change to break
                this.setState((state) => ({
                    minutes: "0" + state.breakLength,
                    seconds: '00',
                    stage: 'Break'
                }))
                this.audio.current.play()
            } else if (this.state.minutes == "00" && this.state.stage == 'Break') { //change to session
                if (this.state.sessionLength > 10) {
                    this.setState((state) => ({
                        minutes: state.sessionLength,
                        stage: 'Session'
                    }))
                    this.audio.current.play()
                } else {
                    this.setState((state) => ({
                        minutes: "0" + state.sessionLength,
                        stage: 'Session'
                    }))
                }
            } else {
                this.setState((state) => ({
                    minutes: "0" + (state.minutes - 1),
                    seconds: 59
                }))
            }
        } else if (this.state.seconds <= 10) {
            this.setState((state) => ({
                seconds: "0" + (state.seconds - 1)
            })) // ticking when seconds < 10
        } else {
            this.setState((state) => ({
                seconds: state.seconds - 1
            })) //normal ticking between minutes, seconds > 10
        }
    }

    handleStartStop() { //first clause if it's running to stop, second clause to start if stopped
        if (this.state.running) {
            clearInterval(this.timerID)
            this.setState({
                running: false
            })
        } else {
            this.timerID = setInterval(
                () => this.tick(),
                1000
            )
            this.setState({
                running: true
            })
        }
    }

    handleReset() {
        this.setState(() => ({
            running: false,
            minutes: '25',
            seconds: '00',
            sessionLength: '25',
            breakLength: '5',
            stage: 'Session'
        }))
        clearInterval(this.timerID)
        this.audio.current.pause()
        this.audio.current.currentTime = 0;
    }

    handleSessionLength(e) {
        if (e.target.value == "increment" && this.state.sessionLength < "60" && !this.state.running) {
            this.setState((state) => ({
                minutes: parseInt(state.minutes) + 1,
                sessionLength: parseInt(state.sessionLength) + 1
            }))
        } else if (e.target.value == "decrement" && this.state.sessionLength > "01" && !this.state.running) {
            if (this.state.minutes > 10) {
                this.setState((state) => ({
                    minutes: parseInt(state.minutes) - 1,
                    sessionLength: parseInt(state.sessionLength) - 1
                }))
            } else {
                this.setState((state) => ({
                    minutes: "0" + (parseInt(state.minutes) - 1),
                    sessionLength: (parseInt(state.sessionLength) - 1)
                }))
            }
        }
    }

    handleBreakLength(e) {
        if (e.target.value == "increment" && this.state.breakLength < "60") {
            this.setState((state) => ({
                breakLength: parseInt(state.breakLength) + 1
            }))
        } else if (e.target.value == "decrement" && this.state.breakLength > "01") {
            this.setState((state) => ({
                breakLength: parseInt(state.breakLength) - 1
            }))
        }
    }

    render() {
        return (
            <div className="app-container">
                <div className="time-display">
                    <h2 id="timer-label">{this.state.stage}</h2>
                    <div id="time-left">{this.state.minutes}:{this.state.seconds}</div>
                    <audio ref={this.audio} id="beep" src="beep.mp3"></audio>

                </div>
                <div className="start-stop-reset-container">
                    <button id="start_stop" title="Start or pause current session/break" onClick={this.handleStartStop}><i class="fa fa-play fa-2x"></i><i class="fa fa-pause fa-2x"></i></button>
                    <button id="reset" title="Reset current session/break and its values" onClick={this.handleReset}><i class="fas fa-history fa-2x"></i></button>
                </div>
                <div className="sesion-break-length-container">

                    <div class="label-buttons-container">
                        <h3 id="session-label">Session Length</h3>
                        <div class="buttons-container">
                            <button id="session-decrement" value="decrement" title="Decrease session length" onClick={this.handleSessionLength}>-</button>
                            <div id="session-length">{this.state.sessionLength}</div>
                            <button id="session-increment" value="increment" title="Increase session length" onClick={this.handleSessionLength}>+</button>
                        </div>

                    </div>
                    <div class="label-buttons-container">
                        <h3 id="break-label">Break Length</h3>
                        <div class="buttons-container">
                            <button id="break-decrement" value="decrement" title="Decrease break length" onClick={this.handleBreakLength}>-</button>
                            <div id="break-length">{this.state.breakLength}</div>
                            <button id="break-increment" value="increment" title="Increase break length" onClick={this.handleBreakLength}>+</button>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);