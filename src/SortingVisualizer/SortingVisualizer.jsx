import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from './sortingAlgorithms/sortingAlgorithms.js';

const SPEED_OF_ANIMATION_MS = 1;

const TOTAL_ARRAY_BARS = 280;

const ORIGINAL_COLOR = 'green';

const COMPARISON_COLOR = 'orange';

export default class SortingVisualizer extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            array: [],
        };

    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {

        const array = [];

        for (let i = 0; i < TOTAL_ARRAY_BARS; i++) {
            array.push(randomIntFromIntervals(10, 720));
        }

        this.setState({array});

    }

    mergeSort() {

        const animations = getMergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {

            const arrayBars = document.getElementsByClassName('array-bar');

            const isColorChange = i % 3 !== 2;

            if (isColorChange) {
                const[barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                const color = i%3 === 0 ? COMPARISON_COLOR : ORIGINAL_COLOR;

                setTimeout(() => {

                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;

                }, i * SPEED_OF_ANIMATION_MS); 

            } else {
                setTimeout(() => {
                    const[barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;

                }, i * SPEED_OF_ANIMATION_MS);
            }

        }


    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    testSortAlgorithms() {

        for (let i = 0; i < 100; i++) {

            const array = [];
            const length = randomIntFromIntervals(1, 1000);

            for (let i = 0; i < length; i++) {

                array.push(randomIntFromIntervals(-1000, 1000));

            }

            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }

    }

    render() {

        const {array} = this.state;

        return (
            <div className='array-container'>
            
                {array.map((value, idx) => (

                    <div 
                    className='array-bar' 
                    key={idx} 
                    style={{backgroundColor: ORIGINAL_COLOR, height: `${value}px`}}
                    >
                        
                    </div>

                )
                
                
                )}

            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            </div>

        );

    }


}

function randomIntFromIntervals(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);

}

function arraysAreEqual(arrayOne, arrayTwo) {

    if (arrayOne.length !== arrayTwo.length) {
        return false;
    }

    for (let i = 0; i < arrayOne.length; i++) {

        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }

    }

    return true;
    
}