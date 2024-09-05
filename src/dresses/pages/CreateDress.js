import React, {
    useEffect,
    useState,
    useRef,
    Fragment,
    useContext,
} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fabric } from "fabric";

import instance from "../../axiosorder";
import Utility from "../components/CreateDress/Utility";
import Canvas from "../components/CreateDress/Canvas";
import Images from "../components/CreateDress/Images";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import "./CreateDress.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Spinner from "../../shared/components/UIElements/Spinner";
import { AuthContext } from "../../shared/context/auth-context";
import axios from "axios";

const CreateDress = (props) => {
    const fabricCanvas = useRef(null);
    const [obj, objCount] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const auth = useContext(AuthContext);

    const openPreviewHandler = () => setShowPreview(true);

    const closePreviewHandler = () => setShowPreview(false);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        fabricCanvas.current = new fabric.Canvas("c", (canvas) => {
            return (
                (canvas.backgroundColor = "blue"),
                (canvas.selectionColor = "blue"),
                (canvas.selectionLineWidth = 2)
            );
        });

        fabricCanvas.current.setDimensions({ width: 300, height: 400 });
    }, []);

    const addDressHandler = (uri) => {
        // startDownload(uri)
        let image;
        try {
            image = localStorage.getItem("saved-image-example");
        } catch (error) {}
        fabric.Image.fromURL(
            image,
            (img) => {
                const oImg = img.set({ left: 100, top: 100 }).scale(0.3);
                fabricCanvas.current.add(oImg).renderAll();
            },
            { crossOrigin: "anonymous" }
        );
        objCount((count) => count + 1);
    };

    const openFileHandler = (event) => {
        const { files } = event.target;

        const imageURL = window.URL.createObjectURL(files[0]);

        fabric.Image.fromURL(
            imageURL,
            (img) => {
                const oImg = img.set({ left: 100, top: 100 }).scale(0.3);
                fabricCanvas.current.add(oImg).renderAll();
            },
            { crossOrigin: "anonymous" }
        );

        objCount((count) => count + 1);
    };
    const removeFileHandler = () => {
        if (fabricCanvas.current.getActiveObject()) {
            fabricCanvas.current.remove(fabricCanvas.current.getActiveObject());
            scrnshotHandler(undefined);
            downLoadHandler(undefined);
            objCount((count) => count - 1);
        } else {
            alert("Please select the image u want to delete");
        }
    };
    const [canvasScrnShot, scrnshotHandler] = useState();
    const [dataURL, downLoadHandler] = useState();

    const saveFileHandler = () => {
        const dataURL = fabricCanvas.current.toDataURL();
        const canvasObj = fabricCanvas.current;
        console.log(canvasObj);
        scrnshotHandler((prev) => {
            prev = canvasObj;
        });
        downLoadHandler(dataURL);
        openPreviewHandler();
    };

    const saveImageHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await sendRequest(
                "dress/uploadDress",
                'POST',
                JSON.stringify({
                    name: "My File A",
                    image: dataURL,
                }),

                {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                }
            );

            console.log(response.data.imageKey);
            closePreviewHandler();
        } catch (error) {
            console.log(error);
            closePreviewHandler();
        }
    };

    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <Spinner asOverlay />}

            <Modal
                show={showPreview}
                onCancel={closePreviewHandler}
                header="Preview"
                contentClass="dress-preview__modal-content"
                footerClass="dress-preview__modal-actions"
                footer={
                    <Fragment>
                        <Button onClick={closePreviewHandler}>Cancel</Button>{" "}
                        <Button onClick={saveImageHandler}>
                            Save and Proceed
                        </Button>
                    </Fragment>
                }
            >
                <div className="preview-container">
                    <img src={dataURL} />
                </div>
            </Modal>
            <Container className="create_dress_main" fluid>
                <Row xs={2} lg={3}>
                    <Col xs={2} lg={2}>
                        <Utility
                            disabled={!obj}
                            save={saveFileHandler}
                            downDis={!dataURL}
                            download={dataURL}
                        />
                    </Col>
                    <Col xs={10} lg={5}>
                        <Canvas
                            openFile={openFileHandler}
                            removeFile={() => removeFileHandler()}
                            disabled={!obj}
                        />
                    </Col>
                    <Col xs={12} lg={5}>
                        <Images clicked={(uri) => addDressHandler(uri)} />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default CreateDress;
