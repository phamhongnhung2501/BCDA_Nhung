// import React from "react";
// import {
//     Card, CardBody, CardHeader, Table,
//     Row, Col
// } from "reactstrap";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faPlus, faList, faTh, faTrash} from "@fortawesome/free-solid-svg-icons";
// import utils from "../utils/utils";
// import {CustomImg, LoadingSprinner} from "./CustomTag";
// import {ModalConfirm} from "./Modal";
// import attachment_gallery from "../assets/img/photos/attachment-gallery.png"
// import "./Attachments.css"

// function isImage(filename) {
//     try {
//         let image = ["png", "jpg", "jpeg", "svg", "ico", "ani", "bmp", "pcx", "pnm", "ras", "tga", "tiff", "wbmp", "xbm", "xpm"];
//         let cut = filename.split(".");
//         let extension = cut[1].toLowerCase();
//         return image.includes(extension);
//     } catch (e) {
//         return false;
//     }
// }

// function handleFileName(filename) {
//     try {
//         let cut = filename.split(".");
//         let name = cut[0];
//         let extension = cut[1];
//         return name.length > 10 ? (name.substring(0, 10) + "..." + extension) : (name + "." + extension)
//     } catch (e) {
//         return filename;
//     }
// }

// class Gallery extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div className="flex-md-wrap d-flex">
//                 {
//                     this.props.data.map((data, index) => {
//                         return (
//                             <a target="_blank" href={data.preview_url} key={utils.randomString()} className="mb-2">
//                                 <div>
//                                     <CustomImg
//                                         key={utils.randomString()}
//                                         src={isImage(data.name) ? data.preview_url : attachment_gallery}
//                                         className="img--user--square-7x mr-4"
//                                     />
//                                 </div>
//                                 <span>{handleFileName(data.name)}</span>
//                             </a>
//                         )
//                     })
//                 }
//             </div>
//         )
//     }
// }

// class RowAttachment extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             remove: false
//         }
//     }

//     toggle(component) {
//         this.setState({
//             [component]: !this.state[component]
//         })
//     }


//     handleRemoveFile(id) {
//         this.toggle("remove");
//         this.props.handleRemoveFile(id)
//     }

//     render() {
//         const {name, description, size, preview_url, owner, id} = this.props.data;
//         const memberInProject = utils.getMemberInProject();
//         return (
//             <>
//                 <ModalConfirm
//                     isOpen={this.state.remove}
//                     handleOk={this.handleRemoveFile.bind(this, id)}
//                     handleCancel={this.toggle.bind(this, "remove")}
//                 />

//                 <tr className="row-attachments">
//                     <td className="width-percent-35"><a href={preview_url}>{name}</a></td>
//                     <td className="width-percent-30">{description}</td>
//                     <td className="width-percent-10">
//                         {
//                             size < 1024
//                                 ?
//                                 size + " B"
//                                 :
//                                 size < 1024 * 1024
//                                     ?
//                                     (size / 1024).toFixed(2) + " Kb"
//                                     :
//                                     size < 1024 * 1024 * 1024
//                                         ?
//                                         (size / 1024 / 1024).toFixed(2) + " Mb"
//                                         :
//                                         (size / 1024 / 1024).toFixed(2) + " Gb"
//                         }
//                     </td>
//                     <td className="width-percent-20">
//                         <CustomImg
//                             src={memberInProject.find(member => member.id === owner).photo}
//                             className="img--user--square-2x mr-1"
//                         />
//                         <span>
//                         {memberInProject.find(member => member.id === owner).full_name}
//                     </span>
//                     </td>
//                     <td className="width-percent-5">
//                         <div>
//                         <FontAwesomeIcon icon={faTrash} className="hover-pointer"
//                                          onClick={this.toggle.bind(this, "remove")}/>
//                         </div>
//                     </td>
//                 </tr>
//             </>
//         )
//     }

// }

// export default class Attachments extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             data: [],

//             mode: true,
//             upload: false,

//             file: {},
//             progress: 0
//         }
//     }

//     componentWillReceiveProps(nextProps, nextContext) {
//         const that = this;
//         this.setState({
//             progress: utils.returnThisWhenNull(nextProps.progress, 0),
//             data: utils.returnThisWhenNull(nextProps.data, [])
//         });

//         if (nextProps.progress == 100) {
//             setTimeout(function () {
//                 that.setState({upload: false})
//             }, 500);
//         }
//     }

//     toggle(component) {
//         this.setState({
//             [component]: !this.state[component]
//         })
//     }

//     handleSelectFile(event) {
//         if (this.state.upload)
//             return;
//         else {
//             this.setState({file: event.target.files[0]});
//             this.toggle("upload");
//             this.props.handleSelectFile(event.target.files[0])
//         }
//     }

//     handleRemoveFile(id) {
//         this.props.handleRemoveFile(id);
//     }

//     render() {
//         return (
//             <Card className="card-attachments">
//                 <CardHeader>
//                     <div className="float-right">
//                         <FontAwesomeIcon
//                             icon={faList}
//                             className={"hover-pointer mr-2 " + (this.state.mode ? "text-color-orange" : "")}
//                             onClick={this.toggle.bind(this, "mode")}
//                         />
//                         <FontAwesomeIcon
//                             icon={faTh}
//                             className={"hover-pointer mr-4 " + (!this.state.mode ? "text-color-orange" : "")}
//                             onClick={this.toggle.bind(this, "mode")}
//                         />
//                         <FontAwesomeIcon
//                             icon={faPlus}
//                             className="hover-pointer"
//                             onClick={() => document.getElementById("attachments-upload").click()}
//                         />

//                         <input type="file" className="d-none" id="attachments-upload"
//                                onChange={this.handleSelectFile.bind(this)}/>
//                     </div>
//                     {this.state.data.length} Attachments
//                 </CardHeader>
//                 <div>
//                     {
//                         !this.props.isLoaded ? null :
//                             this.state.upload ?
//                                 <div className="mb-3 p-3">
//                                     <span className="text-color-blue"><b>Uploading:</b> {this.state.file.name}</span>
//                                 </div>
//                                 : null
//                     }
//                 </div>
//                 <CardBody className="overflow-y-20x scrollbar-style-1 scrollbar-width-1x">
//                     {
//                         !this.props.isLoaded ? <LoadingSprinner/>
//                             :
//                             this.state.mode
//                                 ?
//                                 <Table>
//                                     <tbody>
//                                     {
//                                         this.state.data.map((data, index) => {
//                                             return (
//                                                 <RowAttachment
//                                                     key={utils.randomString()}
//                                                     handleRemoveFile={this.handleRemoveFile.bind(this)}
//                                                     data={data}
//                                                 />
//                                             )
//                                         })
//                                     }
//                                     </tbody>
//                                 </Table>
//                                 :
//                                 <Gallery
//                                     data={this.state.data}
//                                 />
//                     }
//                 </CardBody>
//             </Card>

//         )
//     }
// }