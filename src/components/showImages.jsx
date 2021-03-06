import React, { Component } from "react";
import { imageUrl } from "../config.json";
import { getPictures } from "../services/picServices";
import Modal from "react-modal";
import { paginate } from "../utils/paginate.js";
import Pagination from "./pagination";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

class ShowImage extends Component {
  state = {
    pictures: [],
    currentPhoto: "",
    currentIndex: 0,
    pageSize: 6,
    currentPage: 1,
    show: false
  };

  async componentDidMount() {
    try {
      const { data } = await getPictures();
      let pictures = data.filter(p => p.author === "Alejandro Escamilla");
      const picArray = [];
      let i = 0;
      for (let p of pictures) {
        picArray.push({
          imageUrl: imageUrl + p.id,
          _id: p.id,
          index: i++
        });
      }
      this.setState({ pictures: picArray });
    } catch (ex) {
      console.log(ex);
    }
  }

  handleOpen = ({ currentTarget: input }) => {
    const photo = input.src;
    const id = input.id;
    this.setState({ currentIndex: id, currentPhoto: photo });
    this.showModal();
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  next = id => {
    const { pictures } = this.state;
    let nextId = parseInt(id) + 1;
    if (nextId > pictures.length - 1) {
      nextId = 0;
    }
    this.setState({
      currentIndex: nextId,
      currentPhoto: imageUrl + pictures[nextId]._id
    });
  };

  pre = id => {
    const { pictures } = this.state;
    let nextId = parseInt(id) - 1;
    if (nextId < 0) {
      nextId = pictures.length - 1;
    }
    this.setState({
      currentIndex: nextId,
      currentPhoto: imageUrl + pictures[nextId]._id
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      currentPhoto,
      currentIndex,
      pageSize,
      currentPage,
      show
    } = this.state;
    const totalPictures = this.state.pictures.length;
    const pictures = paginate(this.state.pictures, currentPage, pageSize);
    return (
      <React.Fragment>
        {pictures.map(p => (
          <img
            className="pictures"
            key={p._id}
            id={p.index}
            src={p.imageUrl}
            widht={300}
            height={300}
            alt={"pictures"}
            onClick={this.handleOpen}
          />
        ))}

        <Modal
          isOpen={this.state.show}
          onRequestClose={this.hideModal}
          style={customStyles}
        >
          <span className="close" onClick={this.hideModal}>
            &times;
          </span>
          <button className="prv" onClick={() => this.pre(currentIndex)}>
            &#10094;
          </button>
          <img src={currentPhoto} alt={"pictures"} />
          <button className="nxt" onClick={() => this.next(currentIndex)}>
            &#10095;
          </button>
        </Modal>
        <Pagination
          itemsCount={totalPictures}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
          showModal={show}
        />
      </React.Fragment>
    );
  }
}

export default ShowImage;
