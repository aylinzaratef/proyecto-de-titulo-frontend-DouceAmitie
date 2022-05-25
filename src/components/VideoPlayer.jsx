import { Component } from "react"
import ReactPlayer from "react-player"


export class Video extends Component {
    render() {
        return (
            <div className="contenedor">
                <div className="row">
                    <div className="col-12">
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=-P3VrLJDDww'
                            controls
                            width='95%'
                            height='50vh'
                            className="react-player-position"
                        />
                    </div>
                </div>
            </div>
        );
    }
}