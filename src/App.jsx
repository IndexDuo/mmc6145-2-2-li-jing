import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
    const [showModal, setShowModal] = useState(false);

    const {
        time,
        start: timerStart,
        stop: timerStop,
        reset: timerReset,
    } = useTimer();

    const cardTexts = [
        "Bunny 🐰",
        "Frog 🐸",
        "Panda 🐼",
        "Doggy 🐶",
        "Kitty 😺",
        "Duck 🦆",
    ];

    const [previousTime, setPreviousTime] = useState();
    const [bestTime, setBestTime] = useState();

    return (
        <>
            <Header
                // add time, bestTime, previousTime props
                time={time}
                bestTime={bestTime}
                previousTime={previousTime}
                openModal={() => setShowModal(true)}
            />
            <CardGame
                // add onGameStart, onGameEnd props
                onGameStart={() => {
                    timerReset();
                    timerStart();
                }}
                onGameEnd={() => {
                    timerStop();
                    setPreviousTime(time);
                    setBestTime(() => {
                        // console.log(
                        //     "previousTime :" + previousTime + "  time :" + time
                        // );
                        if (previousTime !== undefined) {
                            return time < previousTime ? time : previousTime;
                        }
                        return time;
                    });
                    timerReset();
                }}
                cardTexts={cardTexts}
            />
            <Modal isShown={showModal} close={() => setShowModal(false)} />
        </>
    );
}
