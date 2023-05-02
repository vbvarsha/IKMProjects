import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
// import { useSelector } from "react-redux";

const containerStyle ={
    display: "flex",
    flexWrap: "unset",
  }
import {
  BackButton,
  PrivateRoute,
  BreadCrumb,
  CommonDashboard,
  FormInputGroup,
  SubmitBar,
  CardLabel,
  CardLabelError,
  Dropdown,
  CheckBox,
  LinkButton,
  SearchAction,
  TextInput,
  UploadFile,
  SearchIconSvg,
  CustomButton,
  TextArea,
  DatePicker,
  RemoveableTag,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
// import SearchApplication from "./SearchApplication";
// import Search from "../pages/employee/Search";
// import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";
// import { cardStyle } from "../utils";

const NoteAndDrafting = ({ path, handleNext, formData, config, onSelect,applDetails }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const history = useHistory();
  // const state = useSelector((state) => state);
  const [noteText, setNoteText] = useState("");
  const [checkDraft, setCheckDraft] = useState(false);
  const [checkNote, setCheckNote] = useState(true);
  const [checkEnquiry, setCheckEnquiry] = useState(false);
  const [showGeoLocation, setShowGeoLocation] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [draftingData, setDraftingData] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [file, setFile] = useState();
  const [fileLimit, setFileLimit] = useState(0);
  const [uploadedFile, setUploadedFile] = useState()
  const setNoteTextField = (e) => {
    setNoteText(e.target.value);
  };
  console.log(applDetails);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.dfm.useApplicationNoteDrafting(tenantId);
  const applicationNumber = "KL-Cochin-C-000125-CRBRNR-2023-APPL";
  // workflow
  const [businessService, setBusinessService] = useState("BIRTHHOSP21");
  const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.cr.useApplicationDetail(t, tenantId, applicationNumber);
  let workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: applicationDetails?.applicationData.tenantid || tenantId,
    id: applicationDetails?.applicationData?.applicationNumber,
    moduleCode: businessService,
    role: "BND_CEMP" || "HOSPITAL_OPERATOR",
    config: {},
  });
  console.log("applicationDetails", workflowDetails);

  //workflow end

  const saveNote = () => {
    const formData = {
      RequestInfo: {
        apiId: "apiId",
        ver: "1.0",
        ts: null,
        action: null,
        did: null,
        key: null,
        msgId: null,
        authToken: "cb24fc0e-9275-4c9b-a08b-837213e8451a",
        correlationId: null,
        userInfo: {
          id: null,
          tenantId: "kl.cochin",
          uuid: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
          roles: [
            {
              id: null,
              name: null,
              code: "EMPLOYEE",
              tenantId: null,
            },
          ],
        },
      },
      ProcessInstances: {
        id: null,
        tenantId: "kl.cochin",
        businessService: "DFM",
        businessId: "123",
        action: "KL-KOCHI-C-000015- FMARISING-2023-AR",
        moduleName: "Note",
        comment: noteText,
        assigner: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
        stateSla: "1",
        businesssServiceSla: "1",
        previousStatus: "1",
        rating: "1",
        auditDetails: {
          createdBy: null,
          createdTime: null,
          lastModifiedBy: null,
          lastModifiedTime: null,
        },

        documents: [
          {
            id: null,
            tenantId: "kl.cochin",
            documentType: "file",
            fileStoreId: "1234567",
            processInstanceId: "123",
            documentUid: "456",
            active: "true",
            auditDetails: {
              createdBy: null,
              createdTime: null,
              lastModifiedBy: null,
              lastModifiedTime: null,
            },
          },
        ],

        assignes: [
          {
            id: null,
            tenantId: "kl.cochin",
            uuid: "123",
            auditDetails: {
              createdBy: null,
              createdTime: null,
              lastModifiedBy: null,
              lastModifiedTime: null,
            },
          },
        ],
      },
    };
    mutation.mutate(formData);
  };
  function handleDraftChange(e) {
    setCheckDraft(e.target.checked);
    if (e.target.checked == true) {
      history.push("/digit-ui/employee/dfm/drafting");
    }
  }
  function handleNoteChange(e) {
    setCheckNote(e.target.checked);
  }
  function handleEnquiryChange(e) {
    setCheckEnquiry(e.target.ckecked);
    if (e.target.checked == true) {
      setShowGeoLocation(true);
    } else {
      setShowGeoLocation(false);
    }
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  });
  const onLocationChange = (code, loc) => {
    console.log("loc", code, loc);
    // setPincode(code)
    setLongitude(loc.longitude);
    setLatitude(loc.latitude);
  };
  const handleFileEvent = (e) => {
    const chooseFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chooseFiles)
  }
  const onRemoved = (index, key) => {
    let afterRemove = uploadFiles?.filter((value, i) => {
      return i !== index;
    });
    setUploadFiles(afterRemove);
  };
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadFiles]
    let limitExceed = false
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
      }
      if (uploaded.length === 5) setFileLimit(true)
      if (uploaded.length > 5) {
        setFileLimit(false)
        limitExceed = true
        return true;
      }
    })
    if (!limitExceed) setUploadFiles(uploaded)
  }
  let draft= [
    {label:"draft1",value:'draft1'},
    {label:"draft2",value:'draf2'},
    {label:"draft3",value:'draft3'},
    {label:"draft4",value:'draft4'},
  ]
  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks" style={{ height: "max-content", backgroundColor: "rgb(233, 228, 225) " }}>
        {/* <div className="FileFlowWrapper note-wrapper"  > */}
        <div className="FileFlowWrapper">
          {/* <div className="row card-document"   >

                        <div className="col-md-12 col-sm-12 col-xs-12 card-document-column">
                             <h2 >{t("DOCUMENTS_INFORMATION")}</h2> 
                            <div className="col-md-4 col-sm-4 col-xs-4">

                                <h3 class="document">{t("DOCUMENT")} 1</h3>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4 link-view">

                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4" >

                                <h3 class="check-mark" >&#10003;</h3>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12  col-xs-12 card-document-column">

                            <div className="col-md-4 col-sm-4  col-xs-4">

                                <h3 class="document">{t("DOCUMENT")} 2</h3>
                            </div>
                            <div className="col-md-4 col-sm-4  col-xs-4 link-view" >

                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div className="col-md-4 col-sm-4  col-xs-4">

                                <h3 class="check-mark">&#10003;</h3>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12  col-xs-12" >

                            <div className="col-md-4 col-sm-4  col-xs-4">

                                <h3 class="document card-document-column">{t("DOCUMENT")} 3</h3>
                            </div>
                            <div className="col-md-4 col-sm-4  col-xs-4 link-view">

                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div className="col-md-4 col-sm-4  col-xs-4">

                                <h3 class="check-mark">&#10003;</h3>
                            </div>
                        </div>
                    </div> */}

          <div className="row reference-row">
            <div className="col-md-12 col-sm-12 col-xs-12 reference-div">
              <div
                className="col-md-7 col-sm-7  col-xs-7"
                style={{
                  maxHeight: "200px",
                  minHeight: "200px",
                  overflowY: "scroll",
                  border: "1px solid rgb(69 69 69 / 18%)",
                  padding: "10px",
                  paddingLeft: "20px",
                }}
              >
                {workflowDetails?.data?.timeline?.map((item) => {
                  return (
                    <ol>
                      <li>Status: {item.status}</li>
                      <li>Assignes: {item?.assignes?.[0]?.name}</li>
                      <li>Created: {item?.auditDetails?.lastModified}</li>
                      <hr style={{ border: "1px solid rgba(69, 69, 69, 0.18)", marginBottom: "15px" }} />
                    </ol>
                  );
                })}
              </div>
              <div className="col-md-5 col-sm-5 col-xs-5 ">
              {draft.map(item=>(
                <div className="col-md-5 col-sm-5 col-xs-5 drafting-row">
                <div className="col-md-3 col-sm-3 col-xs-6">
                  <h3>{item.label} </h3>
                </div>
                <div className="col-md-2 col-sm-1 col-xs-2 link-file">
                  <LinkButton label={t("VIEW")} className="file-link-button" onClick={() => history.push("/digit-ui/employee/dfm/draft-template")} />
                </div>
              </div>
              ))}
              </div>
              
              {/* <div className="col-md-5 col-sm-5 col-xs-5 ">
                <div className="col-md-3 col-sm-3 col-xs-6">
                  <h3>{t("DRAFTING")} 1</h3>
                </div>
                <div className="col-md-2 col-sm-1 col-xs-2 link-file">
                  <LinkButton label={t("VIEW")} className="file-link-button" onClick={() => history.push("/digit-ui/employee/dfm/draft-template")} />
                </div>
              </div> */}
              {/* <div className="col-md-5 col-sm-5 col-xs-5 ">
              <div className="col-md-1  col-sm-3  col-xs-6">
                <h3>{t("DRAFTING")} 2</h3>
              </div>
              <div className="col-md-1  col-sm-1  col-xs-2 link-file view-all">
                <LinkButton label={t("VIEW")} className="file-link-button" onClick={() => history.push("/digit-ui/employee/dfm/draft-template")} />
              </div>
              </div> */}
            </div>
          </div>

          {/* <div class="custom-draft-button" >

                        <CustomButton
                            class="customCardButton"
                            text="View all notes"

                        ></CustomButton>
                    </div> */}

          {showGeoLocation && (
            <div className="row geo-location">
              <div className="col-md-12  col-sm-12 geo-column">
                {/* <div className="col-md-2 col-sm-12">

                                <h3 class="geo-tag">{t("GEO_TAG_LOCATION")}</h3>
                            </div> */}
                <div className="col-md-12">
                  <LocationSearchCard
                    header={t("GEO_TAG_LOCATION")}
                    cardText={t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT")}
                    nextText={t("CURRENT_LOCATION")}
                    //
                    //   skip={() => onSelect()}
                    //   onSave={() => onSelect({ pincode })}
                    onChange={(code, loc) => onLocationChange(code, loc)}
                  />
                  {/* <GoogleMap
                                    onClick={ev => {
                                        console.log("latitide = ", ev.latLng.lat());
                                        console.log("longitude = ", ev.latLng.lng());
                                    }}
                                    defaultZoom={3}
                                    defaultCenter={{ lat: -34.397, lng: 150.644 }}
                                ></GoogleMap> */}
                  {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3703.5056482171453!2d73.71688411494024!3d21.83802336503438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39601d55e43af21f%3A0xb8e23c01a1f6eb18!2sStatue%20of%20Unity!5e0!3m2!1sen!2sin!4v1641230123226!5m2!1sen!2sin"
                                    width="380" height="380" allowfullscreen="" loading="lazy"
                                ></iframe> */}
                </div>
                <div className="col-md-4 col-sm-4">
                  <CardLabel className="card-label-file">{`${t("LONGITUDE")}`}</CardLabel>
                  <TextInput value={longitude} t={t} type={"text"} optionKey="i18nKey" name="RegistrationNo" placeholder={t("longitude")} />
                </div>
                <div className="col-md-4 col-sm-4">
                  <CardLabel className="card-label-file">{`${t("LATITUDE")}`}</CardLabel>
                  <TextInput value={latitude} t={t} type={"text"} optionKey="i18nKey" name="RegistrationNo" placeholder={t("latitude")} />
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-12 col-sm-12  col-xs-12">
              <div className="col-md-3  col-sm-3  col-xs-12 notes">
                <CheckBox t={t} optionKey="name" checked={checkNote} value={checkNote} onChange={(e) => handleNoteChange(e)} disable={checkNote} />
                <CardLabel className="card-label-file">{`${t("NOTE")}`}</CardLabel>
              </div>
              <div className="col-md-3 col-sm-3  col-xs-12 link-file">
                <CheckBox t={t} optionKey="name" checked={checkEnquiry} value={checkEnquiry} onChange={(e) => handleEnquiryChange(e)} />
                <CardLabel className="card-label-file">{`${t("ENQUIRY")}`}</CardLabel>{" "}
              </div>
              <div className="col-md-3  col-sm-3  col-xs-12 drafting">
                <CheckBox t={t} optionKey="name" checked={checkDraft} value={checkDraft} onChange={(e) => handleDraftChange(e)} />
                <CardLabel className="card-label-file">{`${t("DRAFTING")}`} </CardLabel>{" "}
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-md-12 col-sm-12">
              <div className="col-md-7 search-file">
                <TextArea
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="NoteText"
                  placeholder={t("shows_subject_from_application_with_edit_bitton")}
                  onChange={setNoteTextField}
                  value={noteText}
                />

                {/* <div class="link-file">

                                    <LinkButton
                                        label={t("+ADD_REFERENCE_HERE")}
                                        className="file-link-button"
                                    />
                                </div>
                                <div class="link-file">
                                    <LinkButton
                                        label={t("ADD")}
                                        className="file-link-button"


                                    />
                                </div>
                                <div class="link-file-sec" >
                                    <LinkButton
                                        label={t("REMOVE")}
                                        className="file-link-button"


                                    />
                                </div> */}
              </div>
              <div className="col-md-5 search-file">
                <Dropdown t={t} type={"text"} optionKey="i18nKey" name="RegistrationNo" placeholder={t("SEARCH_SELECT_AUTO_NOTES")} />

                <ul
                  style={{
                    maxHeight: "120px",
                    overflowY: "scroll",
                    border: "1px solid rgb(69 69 69 / 18%)",
                    padding: "10px",
                  }}
                >
                  <li>For verification</li>
                  <li>Submitting the draft notice.</li>
                  <li>For verification</li>
                  <li>Submitting the draft notice.</li>
                  <li>For verification</li>
                  <li>Submitting the draft notice.</li>
                  <li>For verification</li>
                  <li>Submitting the draft notice.</li>
                  <li>For verification</li>
                  <li>Submitting the draft notice.</li>
                  <li>For verification</li>
                  <li>Submitting the draft notice.</li>
                  <li>For verification</li>
                  <li>Submitting the draft notice.</li>
                  <li>For verification</li>
                  <li>Submitting the draft notice.</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="row"
            // style={{
            //   height: "70px",
            // }}
          >
            <div className="col-md-12">
              <div className="col-md-2">
                <CardLabel>{`${t("SUPPORTING_DOCUMENTS")}`}</CardLabel>
              </div>
              <div className="col-md-10">
                {/* <UploadFile id={"tl-doc"} extraStyleName={"propertyCreate"} accept=".jpg,.png,.pdf" /> */}
                <UploadFile
                id={"tl-doc"}
                extraStyleName={"propertyCreate"}
                accept=".jpg,.png,.pdf"
                onUpload={handleFileEvent}
                // onUpload={selectfile}
                onDelete={() => {
                  setUploadedFile(null);
                }}
                message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                error={error}
              />
              <div className="tag-container" style={containerStyle}>

                {uploadFiles?.length > 0 &&
                  uploadFiles?.map((value, index) => {
                    return <RemoveableTag key={index} text={`${t(value["name"]).slice(0, 22)} ...`} onClick={() => onRemoved(index, value)} />;
                  })}
              </div>
              </div>
            </div>
          </div>

          {/* /////////////////////////save textarea//////////// */}
          <SubmitBar onClick={saveNote} label={t("SAVE")} > </SubmitBar>
          {/* <div class="custom-draft-button">
           
            <CustomButton onClick={saveNote} text={t("SAVE")}></CustomButton>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NoteAndDrafting;
