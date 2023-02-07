import { CardLabel, CardLabelDesc, FormStep, UploadFile } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import Timeline from "../components/TLTimeline";

const TLDocumentUpload = ({ t, config, onSelect, userType, formData }) => {
  let documentList = [
    "OWNERIDPROOF",
    "OWNERSHIPPROOF",
    "OWNERPHOTO"
  ]

  const [uploadedFile, setUploadedFile] = useState(formData?.owners?.documents?.ProofOfIdentity?.fileStoreId || null);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [error, setError] = useState(null);
  const cityDetails = Digit.ULBService.getCurrentUlb();
  let acceptFormat = ".jpg,.png,.pdf,.jpeg"

  const [dropdownValue, setDropdownValue] = useState(formData?.owners?.documents?.ProofOfIdentity?.documentType || null);
  //let dropdownData = [];
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const { data: Documentsob = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Documents");
  const docs = Documentsob?.PropertyTax?.Documents;
  const proofOfIdentity = Array.isArray(docs) && docs.filter((doc) => doc.code.includes("ADDRESSPROOF"));
  // if (proofOfIdentity.length > 0) {
  //   dropdownData = proofOfIdentity[0]?.dropdownData;
  //   dropdownData.forEach((data) => {
  //     data.i18nKey = stringReplaceAll(data.code, ".", "_");
  //   });
  // }

  // function setTypeOfDropdownValue(dropdownValue) {
  //   setDropdownValue(dropdownValue);
  // }

  const handleSubmit = () => {
    let fileStoreId = uploadedFile;
    let fileDetails = file;
    if (fileDetails) fileDetails.documentType = "OWNERIDPROOF";
    if (fileDetails) fileDetails.fileStoreId = fileStoreId ? fileStoreId : null;
    let owners = formData?.owners;
    if (owners && owners.documents) {
      owners.documents["ProofOfIdentity"] = fileDetails;
    } else {
      owners["documents"] = [];
      owners.documents["ProofOfIdentity"] = fileDetails;
    }
    onSelect(config.key, owners);
  };
  const onSkip = () => onSelect();

  function selectfile(e) {
    console.log(e);
    setUploadedFile(null);
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    (async () => {
      setError(null);
      if (file && file?.type) {
        if (!(acceptFormat?.split(",")?.includes(`.${file?.type?.split("/")?.pop()}`))) {
          setError(t("PT_UPLOAD_FORMAT_NOT_SUPPORTED"));
        }
        else if (file.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("property-upload", file, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("PT_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {

          }
        }
      }
    })();
  }, [file]);

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
      <FormStep config={config} onSelect={handleSubmit} onSkip={onSkip} t={t} isDisabled={!uploadedFile || error}>
      <div className="row">    
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{background:"#fff",padding:"0 10px" }}>Documents</span></h1>
          </div>        
        </div>
        <CardLabelDesc style={{ fontWeight: "unset" }}>{t(`TL_UPLOAD_RESTRICTIONS_TYPES`)}</CardLabelDesc>
        <CardLabelDesc style={{ fontWeight: "unset" }}> {t(`TL_UPLOAD_RESTRICTIONS_SIZE`)}</CardLabelDesc>
        <CardLabel>{`${t("TL_CATEGORY_DOCUMENT_TYPE")}`}</CardLabel>
        {
          documentList.map((doc, index, arr) => (
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  <span>
                    {doc}
                  </span>
                </div>
                <div className="col-md-3">
                  <UploadFile
                    id={doc}
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectfile}
                    onDelete={() => {
                      setUploadedFile(null);
                    }}
                    message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                    error={error}
                  />
                </div>
              </div>
            </div>
          )
          )
        }

        {error ? <div style={{ height: "20px", width: "100%", fontSize: "20px", color: "red", marginTop: "5px" }}>{error}</div> : ""}
        <div style={{ disabled: "true", height: "20px", width: "100%" }}></div>
        <div className="row">    
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{background:"#fff",padding:"0 10px" }}> Declarations</span></h1>
          </div>        
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_ONE")}`}</CardLabel></div> 
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_FOUR")}`}</CardLabel></div> 
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_TWO")}`}</CardLabel></div> 
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_THREE")}`}</CardLabel></div> 
        </div>
      


      </FormStep>
    </React.Fragment>
  );
};

export default TLDocumentUpload;
