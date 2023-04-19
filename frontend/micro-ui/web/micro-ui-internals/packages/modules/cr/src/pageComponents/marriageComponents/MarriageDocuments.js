import React, { useState, useEffect } from "react";
import { FormStep, BackButton, CardLabel, UploadFile, Dropdown } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const MarriageDocuments = ({ formData, config, onSelect }) => {
  console.log("MD", formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  const [uniqueId, setUniqueId] = useState(null);
  const [uploadedImages, setUploadedImagesIds] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState([]);

  let validation = {};

  // const groomResidentShip = "INDIAN";
  // const brideResidentShip = "NRI";

  const groomResidentShip = formData?.GroomDetails?.groomResidentShip;
  const brideResidentShip = formData?.BrideDetails?.brideResidentShip;
  const marriageType = formData?.MarriageDetails?.marriageType;
  const groomMaritalstatusID = formData?.GroomDetails?.groomMaritalstatusID;
  const brideMaritalstatusID = formData?.BrideDetails?.brideMaritalstatusID;
  const expirationTypeHusband = formData?.WitnessDetails?.expirationTypeHusband;
  const expirationTypeWife = formData?.WitnessDetails?.expirationTypeWife;

  console.log(groomResidentShip);

  const crAgeDocuments = [
    {
      name: "Driving License",
      code: "DRIVING_LICENSE",
    },
    {
      name: "School Certificate",
      code: "SCHOOL_CERTIFICATE",
    },
    {
      name: "Birth Certificate",
      code: "BIRTH_CERTIFICATE",
    },
  ];

  const [error, setError] = useState(null);

  const [groomAadharDocumentName, setGroomAadharDocumentName] = useState(null);
  const [groomAadharDocumentType, setGroomAadharDocumentType] = useState(null);
  const [groomAadharDocumentOwner, setGroomAadharDocumentOwner] = useState(null);

  const [brideAadharDocumentName, setBrideAadharDocumentName] = useState(null);
  const [brideAadharDocumentType, setBrideAadharDocumentType] = useState(null);
  const [brideAadharDocumentOwner, setBrideAadharDocumentOwner] = useState(null);

  const [groomPassportDocumentName, setGroomPassportDocumentName] = useState(null);
  const [groomPassportDocumentType, setGroomPassportDocumentType] = useState(null);
  const [groomPassportDocumentOwner, setGroomPassportDocumentOwner] = useState(null);

  const [bridePassportDocumentName, setBridePassportDocumentName] = useState(null);
  const [bridePassportDocumentType, setBridePassportDocumentType] = useState(null);
  const [bridePassportDocumentOwner, setBridePassportDocumentOwner] = useState(null);

  const [groomSSNDocumentName, setGroomSSNDocumentName] = useState(null);
  const [groomSSNDocumentType, setGroomSSNDocumentType] = useState(null);
  const [groomSSNDocumentOwner, setGroomSSNDocumentOwner] = useState(null);

  const [brideSSNDocumentName, setBrideSSNDocumentName] = useState(null);
  const [brideSSNDocumentType, setBrideSSNDocumentType] = useState(null);
  const [brideSSNDocumentOwner, setBrideSSNDocumentOwner] = useState(null);

  const [groomDrivingLicenseDocumentName, setGroomDrivingLicenseDocumentName] = useState(null);
  const [groomDrivingLicenseDocumentType, setGroomDrivingLicenseDocumentType] = useState(null);
  const [groomDrivingLicenseDocumentOwner, setGroomDrivingLicenseDocumentOwner] = useState(null);

  const [brideDrivingLicenseDocumentName, setBrideDrivingLicenseDocumentName] = useState(null);
  const [brideDrivingLicenseDocumentType, setBrideDrivingLicenseDocumentType] = useState(null);
  const [brideDrivingLicenseDocumentOwner, setBrideDrivingLicenseDocumentOwner] = useState(null);

  const [groomSchoolCertificateDocumentName, setGroomSchoolCertificateDocumentName] = useState(null);
  const [groomSchoolCertificateDocumentType, setGroomSchoolCertificateDocumentType] = useState(null);
  const [groomSchoolCertificateDocumentOwner, setGroomSchoolCertificateDocumentOwner] = useState(null);

  const [brideSchoolCertificateDocumentName, setBrideSchoolCertificateDocumentName] = useState(null);
  const [brideSchoolCertificateDocumentType, setBrideSchoolCertificateDocumentType] = useState(null);
  const [brideSchoolCertificateDocumentOwner, setBrideSchoolCertificateDocumentOwner] = useState(null);

  const [groomBirthCertificateDocumentName, setGroomBirthCertificateDocumentName] = useState(null);
  const [groomBirthCertificateDocumentType, setGroomBirthCertificateDocumentType] = useState(null);
  const [groomBirthCertificateDocumentOwner, setGroomBirthCertificateDocumentOwner] = useState(null);

  const [brideBirthCertificateDocumentName, setBrideBirthCertificateDocumentName] = useState(null);
  const [brideBirthCertificateDocumentType, setBrideBirthCertificateDocumentType] = useState(null);
  const [brideBirthCertificateDocumentOwner, setBrideBirthCertificateDocumentOwner] = useState(null);

  const [instituitionCertificateDocumentName, setInstituitionCertificateDocumentName] = useState(null);
  const [instituitionCertificateDocumentType, setInstituitionCertificateDocumentType] = useState(null);
  const [instituitionCertificateDocumentOwner, setInstituitionCertificateDocumentOwner] = useState(null);

  const [marriageOfficerCertificateDocumentName, setMarriageOfficerCertificateDocumentName] = useState(null);
  const [marriageOfficerCertificateDocumentType, setMarriageOfficerCertificateDocumentType] = useState(null);
  const [marriageOfficerCertificateDocumentOwner, setMarriageOfficerCertificateDocumentOwner] = useState(null);

  const [otherMarriageCertificateDocumentName, setOtherMarriageCertificateDocumentName] = useState(null);
  const [otherMarriageCertificateDocumentType, setOtherMarriageCertificateDocumentType] = useState(null);
  const [otherMarriageCertificateDocumentOwner, setOtherMarriageCertificateDocumentOwner] = useState(null);

  const [groomDivorceAnnulledDecreeCertificateDocumentName, setGroomDivorceAnnulledDecreeCertificateDocumentName] = useState(null);
  const [groomDivorceAnnulledDecreeCertificateDocumentType, setGroomDivorceAnnulledDecreeCertificateDocumentType] = useState(null);
  const [groomDivorceAnnulledDecreeCertificateDocumentOwner, setGroomDivorceAnnulledDecreeCertificateDocumentOwner] = useState(null);

  const [brideDivorceAnnulledDecreeCertificateDocumentName, setBrideDivorceAnnulledDecreeCertificateDocumentName] = useState(null);
  const [brideDivorceAnnulledDecreeCertificateDocumentType, setBrideDivorceAnnulledDecreeCertificateDocumentType] = useState(null);
  const [brideDivorceAnnulledDecreeCertificateDocumentOwner, setBrideDivorceAnnulledDecreeCertificateDocumentOwner] = useState(null);

  const [groomExpirationCertificateDocumentName, setGroomExpirationCertificateDocumentName] = useState(null);
  const [groomExpirationCertificateDocumentType, setGroomExpirationCertificateDocumentType] = useState(null);
  const [groomExpirationCertificateDocumentOwner, setGroomExpirationCertificateDocumentOwner] = useState(null);

  const [brideExpirationCertificateDocumentName, setBrideExpirationCertificateDocumentName] = useState(null);
  const [brideExpirationCertificateDocumentType, setBrideExpirationCertificateDocumentType] = useState(null);
  const [brideExpirationCertificateDocumentOwner, setBrideExpirationCertificateDocumentOwner] = useState(null);

  const [witness1AadharDocumentName, setWitness1AadharDocumentName] = useState(null);
  const [witness1AadharDocumentType, setWitness1AadharDocumentType] = useState(null);
  const [witness1AadharDocumentOwner, setWitness1AadharDocumentOwner] = useState(null);

  const [witness2AadharDocumentName, setWitness2AadharDocumentName] = useState(null);
  const [witness2AadharDocumentType, setWitness2AadharDocumentType] = useState(null);
  const [witness2AadharDocumentOwner, setWitness2AadharDocumentOwner] = useState(null);

  const [groomAgeDocument, setGroomAgeDocument] = useState(
    formData?.MarriageDocuments?.groomAgeDocument?.code ? formData?.MarriageDocuments?.groomAgeDocument?.code : null
  );
  const [brideAgeDocument, setBrideAgeDocument] = useState(
    formData?.MarriageDocuments?.brideAgeDocument?.code ? formData?.MarriageDocuments?.brideAgeDocument?.code : null
  );

  const [groomAadhar, setGroomAadhar] = useState(null);
  const [groomAadharDocument, setGroomAadharDocument] = useState(
    formData?.MarriageDocuments?.groomAadharDocument ? formData?.MarriageDocuments?.groomAadharDocument : null
  );
  const [brideAadhar, setBrideAadhar] = useState(null);
  const [brideAadharDocument, setBrideAadharDocument] = useState(
    formData?.MarriageDocuments?.brideAadharDocument ? formData?.MarriageDocuments?.brideAadharDocument : null
  );

  const [groomPassport, setGroomPassport] = useState(null);
  const [groomPassportDocument, setGroomPassportDocument] = useState(
    formData?.MarriageDocuments?.groomPassportDocument ? formData?.MarriageDocuments?.groomPassportDocument : null
  );
  const [bridePassport, setBridePassport] = useState(null);
  const [bridePassportDocument, setBridePassportDocument] = useState(
    formData?.MarriageDocuments?.bridePassportDocument ? formData?.MarriageDocuments?.bridePassportDocument : null
  );

  const [groomSSN, setGroomSSN] = useState(null);
  const [groomSSNDocument, setGroomSSNDocument] = useState(
    formData?.MarriageDocuments?.groomSSNDocument ? formData?.MarriageDocuments?.groomSSNDocument : null
  );
  const [brideSSN, setBrideSSN] = useState(null);
  const [brideSSNDocument, setBrideSSNDocument] = useState(
    formData?.MarriageDocuments?.brideSSNDocument ? formData?.MarriageDocuments?.brideSSNDocument : null
  );

  const [groomDrivingLicense, setGroomDrivingLicense] = useState(null);
  const [groomDrivingLicenseDocument, setGroomDrivingLicenseDocument] = useState(
    formData?.MarriageDocuments?.groomDrivingLicenseDocument ? formData?.MarriageDocuments?.groomDrivingLicenseDocument : null
  );
  const [brideDrivingLicense, setBrideDrivingLicense] = useState(null);
  const [brideDrivingLicenseDocument, setBrideDrivingLicenseDocument] = useState(
    formData?.MarriageDocuments?.brideDrivingLicenseDocument ? formData?.MarriageDocuments?.brideDrivingLicenseDocument : null
  );

  const [groomSchoolCertificate, setGroomSchoolCertificate] = useState(null);
  const [groomSchoolCertificateDocument, setGroomSchoolCertificateDocument] = useState(
    formData?.MarriageDocuments?.groomSchoolCertificateDocument ? formData?.MarriageDocuments?.groomSchoolCertificateDocument : null
  );
  const [brideSchoolCertificate, setBrideSchoolCertificate] = useState(null);
  const [brideSchoolCertificateDocument, setBrideSchoolCertificateDocument] = useState(
    formData?.MarriageDocuments?.brideSchoolCertificateDocument ? formData?.MarriageDocuments?.brideSchoolCertificateDocument : null
  );

  const [groomBirthCertificate, setGroomBirthCertificate] = useState(null);
  const [groomBirthCertificateDocument, setGroomBirthCertificateDocument] = useState(
    formData?.MarriageDocuments?.groomBirthCertificateDocument ? formData?.MarriageDocuments?.groomBirthCertificateDocument : null
  );
  const [brideBirthCertificate, setBrideBirthCertificate] = useState(null);
  const [brideBirthCertificateDocument, setBrideBirthCertificateDocument] = useState(
    formData?.MarriageDocuments?.brideBirthCertificateDocument ? formData?.MarriageDocuments?.brideBirthCertificateDocument : null
  );

  const [instituitionCertificate, setInstituitionCertificate] = useState(null);
  const [instituitionCertificateDocument, setInstituitionCertificateDocument] = useState(
    formData?.MarriageDocuments?.instituitionCertificateDocument ? formData?.MarriageDocuments?.instituitionCertificateDocument : null
  );
  const [marriageOfficerCertificate, setMarriageOfficerCertificate] = useState(null);
  const [marriageOfficerCertificateDocument, setMarriageOfficerCertificateDocument] = useState(
    formData?.MarriageDocuments?.marriageOfficerCertificateDocument ? formData?.MarriageDocuments?.marriageOfficerCertificateDocument : null
  );
  const [otherMarriageCertificate, setOtherMarriageCertificate] = useState(null);
  const [otherMarriageCertificateDocument, setOtherMarriageCertificateDocument] = useState(
    formData?.MarriageDocuments?.otherMarriageCertificateDocument ? formData?.MarriageDocuments?.otherMarriageCertificateDocument : null
  );

  const [groomDivorceAnnulledDecreeCertificate, setGroomDivorceAnnulledDecreeCertificate] = useState(null);
  const [groomDivorceAnnulledDecreeCertificateDocument, setGroomDivorceAnnulledDecreeCertificateDocument] = useState(
    formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocument
      ? formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocument
      : null
  );
  const [brideDivorceAnnulledDecreeCertificate, setBrideDivorceAnnulledDecreeCertificate] = useState(null);
  const [brideDivorceAnnulledDecreeCertificateDocument, setBrideDivorceAnnulledDecreeCertificateDocument] = useState(
    formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocument
      ? formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocument
      : null
  );

  const [groomExpirationCertificate, setGroomExpirationCertificate] = useState(null);
  const [groomExpirationCertificateDocument, setGroomExpirationCertificateDocument] = useState(
    formData?.MarriageDocuments?.groomExpirationCertificateDocument ? formData?.MarriageDocuments?.groomExpirationCertificateDocument : null
  );
  const [brideExpirationCertificate, setBrideExpirationCertificate] = useState(null);
  const [brideExpirationCertificateDocument, setBrideExpirationCertificateDocument] = useState(
    formData?.MarriageDocuments?.brideExpirationCertificateDocument ? formData?.MarriageDocuments?.brideExpirationCertificateDocument : null
  );

  const [witness1Aadhar, setWitness1Aadhar] = useState(null);
  const [witness1AadharDocument, setWitness1AadharDocument] = useState(
    formData?.MarriageDocuments?.witness1AadharDocument ? formData?.MarriageDocuments?.witness1AadharDocument : null
  );

  const [witness2Aadhar, setWitness2Aadhar] = useState(null);
  const [witness2AadharDocument, setWitness2AadharDocument] = useState(
    formData?.MarriageDocuments?.witness1AadharDocument ? formData?.MarriageDocuments?.witness1AadharDocument : null
  );

  function setSelectGroomAgeDocument(value) {
    setGroomAgeDocument(value);
  }

  function setSelectBrideAgeDocument(value) {
    setBrideAgeDocument(value);
  }

  function selectGroomAadhar(e) {
    const groomAadharFile = e.target.files[0];
    setGroomAadharDocument(groomAadharFile);
    setGroomAadharDocumentName(groomAadharFile.name);
    setGroomAadharDocumentType("Aadhar");
    setGroomAadharDocumentOwner("G");
  }

  function selectBrideAadhar(e) {
    const brideAadharFile = e.target.files[0];
    setBrideAadharDocument(brideAadharFile);
    setBrideAadharDocumentName(brideAadharFile.name);
    setBrideAadharDocumentType("Aadhar");
    setBrideAadharDocumentOwner("B");
  }

  function selectGroomPassport(e) {
    const groomPassportFile = e.target.files[0];
    setGroomPassportDocument(groomPassportFile);
    setGroomPassportDocumentName(groomPassportFile.name);
    setGroomPassportDocumentType("Passport");
    setGroomPassportDocumentOwner("G");
  }

  function selectBridePassport(e) {
    const bridePassportFile = e.target.files[0];
    setBridePassportDocument(bridePassportFile);
    setBridePassportDocumentName(bridePassportFile.name);
    setBridePassportDocumentType("Passport");
    setBridePassportDocumentOwner("B");
  }

  function selectGroomSSN(e) {
    const groomSSNFile = e.target.files[0];
    setGroomSSNDocument(groomSSNFile);
    setGroomSSNDocumentName(groomSSNFile.name);
    setGroomSSNDocumentType("SSN");
    setGroomSSNDocumentOwner("G");
  }

  function selectBrideSSN(e) {
    const brideSSNFile = e.target.files[0];
    setBrideSSNDocument(brideSSNFile);
    setBrideSSNDocumentName(brideSSNFile.name);
    setBrideSSNDocumentType("SSN");
    setBrideSSNDocumentOwner("B");
  }

  function selectGroomDrivingLicense(e) {
    const groomDrivingLicenseFile = e.target.files[0];
    setGroomDrivingLicenseDocument(groomDrivingLicenseFile);
    setGroomDrivingLicenseDocumentName(groomDrivingLicenseFile.name);
    setGroomDrivingLicenseDocumentType("DrivingLicense");
    setGroomDrivingLicenseDocumentOwner("G");
  }

  function selectBrideDrivingLicense(e) {
    const brideDrivingLicenseFile = e.target.files[0];
    setBrideDrivingLicenseDocument(brideDrivingLicenseFile);
    setBrideDrivingLicenseDocumentName(brideDrivingLicenseFile.name);
    setBrideDrivingLicenseDocumentType("SSN");
    setBrideDrivingLicenseDocumentOwner("B");
  }

  function selectGroomSchoolCertificate(e) {
    const groomSchoolCertificateFile = e.target.files[0];
    setGroomSchoolCertificateDocument(groomSchoolCertificateFile);
    setGroomSchoolCertificateDocumentName(groomSchoolCertificateFile.name);
    setGroomSchoolCertificateDocumentType("SchoolCertificate");
    setGroomSchoolCertificateDocumentOwner("G");
  }

  function selectBrideSchoolCertificate(e) {
    const brideSchoolCertificateFile = e.target.files[0];
    setBrideSchoolCertificateDocument(brideSchoolCertificateFile);
    setBrideSchoolCertificateDocumentName(brideSchoolCertificateFile.name);
    setBrideSchoolCertificateDocumentType("SchoolCertificate");
    setBrideSchoolCertificateDocumentOwner("B");
  }

  function selectGroomBirthCertificate(e) {
    const groomBirthCertificateFile = e.target.files[0];
    setGroomBirthCertificateDocument(groomBirthCertificateFile);
    setGroomBirthCertificateDocumentName(groomBirthCertificateFile.name);
    setGroomBirthCertificateDocumentType("BirthCertificate");
    setGroomBirthCertificateDocumentOwner("G");
  }

  function selectBrideBirthCertificate(e) {
    const brideBirthCertificateFile = e.target.files[0];
    setBrideBirthCertificateDocument(brideBirthCertificateFile);
    setBrideBirthCertificateDocumentName(brideBirthCertificateFile.name);
    setBrideBirthCertificateDocumentType("BirthCertificate");
    setBrideBirthCertificateDocumentOwner("B");
  }

  function selectInstituitionCertificate(e) {
    const instituitionCertificateFile = e.target.files[0];
    setInstituitionCertificateDocument(instituitionCertificateFile);
    setInstituitionCertificateDocumentName(instituitionCertificateFile.name);
    setInstituitionCertificateDocumentType("InstituitionCertificate");
    setInstituitionCertificateDocumentOwner("C");
  }

  function selectMarriageOfficerCertificate(e) {
    const brideMarriageOfficerCertificateFile = e.target.files[0];
    setMarriageOfficerCertificateDocument(brideMarriageOfficerCertificateFile);
    setMarriageOfficerCertificateDocumentName(brideMarriageOfficerCertificateFile.name);
    setMarriageOfficerCertificateDocumentType("MarriageOfficerCertificate");
    setMarriageOfficerCertificateDocumentOwner("C");
  }

  function selectOtherMarriageCertificate(e) {
    const otherMarriageCertificateFile = e.target.files[0];
    setOtherMarriageCertificateDocument(otherMarriageCertificateFile);
    setOtherMarriageCertificateDocumentName(otherMarriageCertificateFile.name);
    setOtherMarriageCertificateDocumentType("OtherMarriageCertificate");
    setOtherMarriageCertificateDocumentOwner("C");
  }

  function selectGroomDivorceAnnulledDecreeCertificate(e) {
    const groomDivorceAnnulledDecreeCertificateFile = e.target.files[0];
    setGroomDivorceAnnulledDecreeCertificateDocument(groomDivorceAnnulledDecreeCertificateFile);
    setGroomDivorceAnnulledDecreeCertificateDocumentName(groomDivorceAnnulledDecreeCertificateFile.name);
    setGroomDivorceAnnulledDecreeCertificateDocumentType("DivorceAnnulledDecreeCertificate");
    setGroomDivorceAnnulledDecreeCertificateDocumentOwner("G");
  }

  function selectBrideDivorceAnnulledDecreeCertificate(e) {
    const brideDivorceAnnulledDecreeCertificateFile = e.target.files[0];
    setBrideDivorceAnnulledDecreeCertificateDocument(brideDivorceAnnulledDecreeCertificateFile);
    setBrideDivorceAnnulledDecreeCertificateDocumentName(brideDivorceAnnulledDecreeCertificateFile.name);
    setBrideDivorceAnnulledDecreeCertificateDocumentType("DivorceAnnulledDecreeCertificate");
    setBrideDivorceAnnulledDecreeCertificateDocumentOwner("B");
  }

  function selectGroomExpirationCertificate(e) {
    const groomExpirationCertificateFile = e.target.files[0];
    setGroomExpirationCertificateDocument(groomExpirationCertificateFile);
    setGroomExpirationCertificateDocumentName(groomExpirationCertificateFile.name);
    setGroomExpirationCertificateDocumentType("ExpirationCertificate");
    setGroomExpirationCertificateDocumentOwner("G");
  }

  function selectBrideExpirationCertificate(e) {
    const brideExpirationCertificateFile = e.target.files[0];
    setBrideExpirationCertificateDocument(brideExpirationCertificateFile);
    setBrideExpirationCertificateDocumentName(brideExpirationCertificateFile.name);
    setBrideExpirationCertificateDocumentType("ExpirationCertificate");
    setBrideExpirationCertificateDocumentOwner("B");
  }

  function selectWitness1Aadhar(e) {
    const witness1AadharFile = e.target.files[0];
    setWitness1AadharDocument(witness1AadharFile);
    setWitness1AadharDocumentName(witness1AadharFile.name);
    setWitness1AadharDocumentType("Aadhar");
    setWitness1AadharDocumentOwner("W");
  }

  function selectWitness2Aadhar(e) {
    const witness2AadharFile = e.target.files[0];
    setWitness2AadharDocument(witness2AadharFile);
    setWitness2AadharDocumentName(witness2AadharFile.name);
    setWitness2AadharDocumentType("Aadhar");
    setWitness2AadharDocumentOwner("W");
  }

  useEffect(() => {
    setUniqueId(uuidv4());
  }, []);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomAadharDocument) {
        if (groomAadharDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/groom/aadhar/${currentYear}`,
              groomAadharDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setGroomAadhar(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomAadharDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideAadharDocument) {
        if (brideAadharDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/aadhar/${currentYear}`,
              brideAadharDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setBrideAadhar(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideAadharDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomPassportDocument) {
        console.log("Hi....");
        if (groomPassportDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/groom/passport/${currentYear}`,
              groomPassportDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setGroomPassport(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomPassportDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (bridePassportDocument) {
        if (bridePassportDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/passport/${currentYear}`,
              bridePassportDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setBridePassport(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [bridePassportDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomSSNDocument) {
        if (groomSSNDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(`crmarriage/${uniqueId}/groom/ssn/${currentYear}`, groomSSNDocument, tenantId);
            if (response?.data?.files?.length > 0) {
              setGroomSSN(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomSSNDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideSSNDocument) {
        if (brideSSNDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(`crmarriage/${uniqueId}/bride/ssn/${currentYear}`, brideSSNDocument, tenantId);
            if (response?.data?.files?.length > 0) {
              setBrideSSN(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideSSNDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomDrivingLicenseDocument) {
        if (groomDrivingLicenseDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/groom/drivinglicense/${currentYear}`,
              groomDrivingLicenseDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setGroomDrivingLicense(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomDrivingLicenseDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideDrivingLicenseDocument) {
        if (brideDrivingLicenseDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/drivinglicense/${currentYear}`,
              brideDrivingLicenseDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setBrideDrivingLicense(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideDrivingLicenseDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomSchoolCertificateDocument) {
        if (groomSchoolCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/groom/schoolcertificate/${currentYear}`,
              groomSchoolCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setGroomSchoolCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomSchoolCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideSchoolCertificateDocument) {
        if (brideSchoolCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/schoolcertificate/${currentYear}`,
              brideSchoolCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setBrideSchoolCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideSchoolCertificateDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomBirthCertificateDocument) {
        if (groomBirthCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/groom/birthcertificate/${currentYear}`,
              groomBirthCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setGroomSchoolCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomBirthCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideBirthCertificateDocument) {
        if (brideBirthCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/birthcertificate/${currentYear}`,
              brideBirthCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setBrideBirthCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideBirthCertificateDocument]);

  const getFormatWrapper = (tenantId, data = []) => {
    let response = [];
    _.each(data, (item) => {
      let tempData = getFormattedData({ tenantId, ...item });
      if (!_.isEmpty(tempData)) {
        return response.push(tempData);
      }
    });
    return response;
  };

  const getFormattedData = ({ documentName, documentType, documentOwner, fileStoreId, tenantId, ...rest }) => {
    let response = {
      id: null,
      marriageId: null,
      active: true,
      marriageTenantId: tenantId,
      auditDetails: {
        creditedBy: null,
        lastModifiedBy: null,
        createdBy: null,
        lastModifiedTime: null,
      },
      ...rest,
    };

    if (_.isEmpty(documentName) || _.isEmpty(documentType) || _.isEmpty(documentOwner) || _.isEmpty(fileStoreId) || _.isEmpty(tenantId)) {
      return {};
    } else {
      return {
        ...response,
        documentName,
        documentType,
        documentOwner,
        fileStoreId,
      };
    }
  };

  // let documentArray = [
  //   {
  //     documentName: groomAadharDocumentName,
  //     documentType: groomAadharDocumentType,
  //     documentOwner: groomAadharDocumentOwner,
  //     fileStoreId: groomAadhar,
  //   },
  //   {
  //     documentName: brideAadharDocumentName,
  //     documentType: brideAadharDocumentType,
  //     documentOwner: brideAadharDocumentOwner,
  //     fileStoreId: brideAadhar,
  //   },
  // ];

  const goNext = () => {
    onSelect(config.key, {
      DocumentDetails: getFormatWrapper(tenantId, [
        {
          documentName: groomAadharDocumentName,
          documentType: groomAadharDocumentType,
          documentOwner: groomAadharDocumentOwner,
          fileStoreId: groomAadhar,
        },
        {
          documentName: brideAadharDocumentName,
          documentType: brideAadharDocumentType,
          documentOwner: brideAadharDocumentOwner,
          fileStoreId: brideAadhar,
        },

        {
          documentName: groomPassportDocumentName,
          documentType: groomPassportDocumentType,
          documentOwner: groomPassportDocumentOwner,
          fileStoreId: groomPassport,
        },

        {
          documentName: bridePassportDocumentName,
          documentType: bridePassportDocumentType,
          documentOwner: bridePassportDocumentOwner,
          fileStoreId: bridePassport,
        },

        {
          documentName: groomSSNDocumentName,
          documentType: groomSSNDocumentType,
          documentOwner: groomSSNDocumentOwner,
          fileStoreId: groomSSN,
        },

        {
          documentName: brideSSNDocumentName,
          documentType: brideSSNDocumentType,
          documentOwner: brideSSNDocumentOwner,
          fileStoreId: brideSSN,
        },
        {
          documentName: groomDrivingLicenseDocumentName,
          documentType: groomDrivingLicenseDocumentType,
          documentOwner: groomDrivingLicenseDocumentOwner,
          fileStoreId: groomDrivingLicense,
        },

        {
          documentName: brideDrivingLicenseDocumentName,
          documentType: brideDrivingLicenseDocumentType,
          documentOwner: brideDrivingLicenseDocumentOwner,
          fileStoreId: brideDrivingLicense,
        },

        {
          documentName: groomSchoolCertificateDocumentName,
          documentType: groomSchoolCertificateDocumentType,
          documentOwner: groomSchoolCertificateDocumentOwner,
          fileStoreId: groomSchoolCertificate,
        },

        {
          documentName: brideSchoolCertificateDocumentName,
          documentType: brideSchoolCertificateDocumentType,
          documentOwner: brideSchoolCertificateDocumentOwner,
          fileStoreId: brideSchoolCertificate,
        },

        {
          documentName: groomBirthCertificateDocumentName,
          documentType: groomBirthCertificateDocumentType,
          documentOwner: groomBirthCertificateDocumentOwner,
          fileStoreId: groomBirthCertificate,
        },

        {
          documentName: brideBirthCertificateDocumentName,
          documentType: brideBirthCertificateDocumentType,
          documentOwner: brideBirthCertificateDocumentOwner,
          fileStoreId: brideBirthCertificate,
        },

        {
          documentName: instituitionCertificateDocumentName,
          documentType: instituitionCertificateDocumentType,
          documentOwner: instituitionCertificateDocumentOwner,
          fileStoreId: instituitionCertificate,
        },

        {
          documentName: marriageOfficerCertificateDocumentName,
          documentType: marriageOfficerCertificateDocumentType,
          documentOwner: marriageOfficerCertificateDocumentOwner,
          fileStoreId: marriageOfficerCertificate,
        },

        {
          documentName: otherMarriageCertificateDocumentName,
          documentType: otherMarriageCertificateDocumentType,
          documentOwner: otherMarriageCertificateDocumentOwner,
          fileStoreId: otherMarriageCertificate,
        },

        {
          documentName: groomDivorceAnnulledDecreeCertificateDocumentName,
          documentType: groomDivorceAnnulledDecreeCertificateDocumentType,
          documentOwner: groomDivorceAnnulledDecreeCertificateDocumentOwner,
          fileStoreId: groomDivorceAnnulledDecreeCertificate,
        },

        {
          documentName: brideDivorceAnnulledDecreeCertificateDocumentName,
          documentType: brideDivorceAnnulledDecreeCertificateDocumentType,
          documentOwner: brideDivorceAnnulledDecreeCertificateDocumentOwner,
          fileStoreId: brideDivorceAnnulledDecreeCertificate,
        },

        {
          documentName: groomExpirationCertificateDocumentName,
          documentType: groomExpirationCertificateDocumentType,
          documentOwner: groomExpirationCertificateDocumentOwner,
          fileStoreId: groomExpirationCertificate,
        },

        {
          documentName: brideExpirationCertificateDocumentName,
          documentType: brideExpirationCertificateDocumentType,
          documentOwner: brideExpirationCertificateDocumentOwner,
          fileStoreId: brideExpirationCertificate,
        },

        {
          documentName: witness1AadharDocumentName,
          documentType: witness1AadharDocumentType,
          documentOwner: witness1AadharDocumentOwner,
          fileStoreId: witness1Aadhar,
        },

        {
          documentName: witness2AadharDocumentName,
          documentType: witness2AadharDocumentType,
          documentOwner: witness2AadharDocumentOwner,
          fileStoreId: witness2Aadhar,
        },
      ]),
    });
  };
  const onSkip = () => onSelect();

  useEffect(() => {
    (async () => {
      setError(null);
      if (instituitionCertificateDocument) {
        if (instituitionCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/common/instituitioncertificate/${currentYear}`,
              instituitionCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setInstituitionCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [instituitionCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (marriageOfficerCertificateDocument) {
        if (marriageOfficerCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/common/marriageofficercertificate/${currentYear}`,
              marriageOfficerCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setMarriageOfficerCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [marriageOfficerCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (otherMarriageCertificateDocument) {
        if (otherMarriageCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/common/othermarriagecertificate/${currentYear}`,
              otherMarriageCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setOtherMarriageCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [otherMarriageCertificateDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomDivorceAnnulledDecreeCertificateDocument) {
        if (groomDivorceAnnulledDecreeCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/groom/divorceannuleddecree/${currentYear}`,
              groomDivorceAnnulledDecreeCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setGroomDivorceAnnulledDecreeCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomDivorceAnnulledDecreeCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideDivorceAnnulledDecreeCertificateDocument) {
        if (brideDivorceAnnulledDecreeCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/divorceannuleddecree/${currentYear}`,
              brideDivorceAnnulledDecreeCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setBrideDivorceAnnulledDecreeCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideDivorceAnnulledDecreeCertificateDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomExpirationCertificateDocument) {
        if (groomExpirationCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/groom/expirationcertificate/${currentYear}`,
              groomExpirationCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setGroomExpirationCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomExpirationCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideExpirationCertificateDocument) {
        if (brideExpirationCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/expirationcertificate/${currentYear}`,
              brideExpirationCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setBrideExpirationCertificate(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideExpirationCertificateDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (witness1AadharDocument) {
        if (witness1AadharDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/witness1/aadhar/${currentYear}`,
              witness1AadharDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setWitness1Aadhar(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [witness1AadharDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (witness2AadharDocument) {
        if (witness2AadharDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/witness2/aadhar/${currentYear}`,
              witness2AadharDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              setWitness2Aadhar(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [witness2AadharDocument]);

  console.log(witness1Aadhar);
  console.log(witness2Aadhar);

  return (
    <div className="row">
      <div className="col-md-12">
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
          <div className="row">
            <div className="col-md-12" style={{ marginBottom: "20px" }}>
              <div className="row">
                <div className="col-md-12" style={{ marginBottom: "20px" }}>
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MARRIAGE_DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_DOCUMENTS")}`}</span>{" "}
                  </h1>
                </div>
                <div className="col-md-6">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_DOCUMENTS")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_RESIDENTSHIP")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {groomResidentShip === "INDIAN" && (
                    <div className="col-md-12">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_YOUR_AADHAR`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectGroomAadhar}
                        onDelete={() => {
                          setGroomAadhar(null);
                        }}
                        message={groomAadhar ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  )}
                  {(groomResidentShip === "NRI" || groomResidentShip === "FOREIGN") && (
                    <React.Fragment>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_PASSPORT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectGroomPassport}
                          onDelete={() => {
                            setGroomPassport(null);
                          }}
                          message={groomPassport ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_SOCIAL_SECURITY_DOCUMENT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectGroomSSN}
                          onDelete={() => {
                            setGroomSSN(null);
                          }}
                          message={groomSSN ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <div className="col-md-6">
                  {brideResidentShip === "INDIAN" && (
                    <div className="col-md-12">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_YOUR_AADHAR`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectBrideAadhar}
                        onDelete={() => {
                          setBrideAadhar(null);
                        }}
                        message={brideAadhar ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  )}
                  {(brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && (
                    <React.Fragment>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_PASSPORT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectBridePassport}
                          onDelete={() => {
                            setBridePassport(null);
                          }}
                          message={bridePassport ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                      <div className="col-md-12">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_SOCIAL_SECURITY_DOCUMENT`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectBrideSSN}
                          onDelete={() => {
                            setBrideSSN(null);
                          }}
                          message={brideSSN ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_AGE")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="col-md-7">
                    <CardLabel>
                      {`${t("CR_SELECT_DOCUMENT")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={true}
                      placeholder={t("CR_SELECT_DOCUMENT")}
                      option={crAgeDocuments}
                      selected={groomAgeDocument}
                      select={setSelectGroomAgeDocument}
                      {...(validation = { isRequired: true, title: t("CR_INVALID_SELECT_DOCUMENT") })}
                    />
                  </div>
                  {groomAgeDocument?.code === "DRIVING_LICENSE" && (
                    <div className="col-md-7">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_YOUR_DRIVING_LICENSE`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectGroomDrivingLicense}
                        onDelete={() => {
                          setGroomDrivingLicense(null);
                        }}
                        message={groomDrivingLicense ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  )}
                  {groomAgeDocument?.code === "SCHOOL_CERTIFICATE" && (
                    <div className="col-md-7">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_YOUR_SCHOOL_CERTIFICATE`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectGroomSchoolCertificate}
                        onDelete={() => {
                          setGroomSchoolCertificate(null);
                        }}
                        message={groomSchoolCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  )}
                  {groomAgeDocument?.code === "BIRTH_CERTIFICATE" && (
                    <div className="col-md-7">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_YOUR_BIRTH_CERTIFICATE`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectGroomBirthCertificate}
                        onDelete={() => {
                          setGroomBirthCertificate(null);
                        }}
                        message={groomBirthCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="col-md-7">
                    <CardLabel>
                      {`${t("CR_SELECT_DOCUMENT")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={true}
                      placeholder={t("CR_SELECT_DOCUMENT")}
                      option={crAgeDocuments}
                      selected={brideAgeDocument}
                      select={setSelectBrideAgeDocument}
                      {...(validation = { isRequired: true, title: t("CR_INVALID_SELECT_DOCUMENT") })}
                    />
                  </div>
                  {brideAgeDocument?.code === "DRIVING_LICENSE" && (
                    <div className="col-md-7">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_YOUR_DRIVING_LICENSE`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectBrideDrivingLicense}
                        onDelete={() => {
                          setBrideDrivingLicense(null);
                        }}
                        message={brideDrivingLicense ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  )}
                  {brideAgeDocument?.code === "SCHOOL_CERTIFICATE" && (
                    <div className="col-md-7">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_YOUR_SCHOOL_CERTIFICATE`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectBrideSchoolCertificate}
                        onDelete={() => {
                          setBrideSchoolCertificate(null);
                        }}
                        message={brideSchoolCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  )}
                  {brideAgeDocument?.code === "BIRTH_CERTIFICATE" && (
                    <div className="col-md-7">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_YOUR_BIRTH_CERTIFICATE`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectBrideBirthCertificate}
                        onDelete={() => {
                          setBrideBirthCertificate(null);
                        }}
                        message={brideBirthCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_MARRIAGE")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                {(marriageType === "MARRIAGE_TYPE_HINDU" ||
                  marriageType === "MARRIAGE_TYPE_CHRISTIAN" ||
                  marriageType === "MARRIAGE_TYPE_MUSLIM" ||
                  marriageType === "MARRIAGE_TYPE_BUDHISM" ||
                  marriageType === "MARRIAGE_TYPE_JAINISM" ||
                  marriageType === "MARRIAGE_TYPE_SIKHISM" ||
                  marriageType === "MARRIAGE_TYPE_ZORASTRIANISM") && (
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_MARRIAGE_CERTIFICATE_BY_RELIGIOUS_INSTITUTION`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectInstituitionCertificate}
                        onDelete={() => {
                          setInstituitionCertificate(null);
                        }}
                        message={instituitionCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  </div>
                )}
                {marriageType === "MARRIAGE_TYPE_SPECIAL_ACT" && (
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <CardLabel>
                        {`${t(`CR_UPLOAD_MARRIAGE_CERTIFICATE_BY_MARRIAGE_OFFICER`)}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectMarriageOfficerCertificate}
                        onDelete={() => {
                          setMarriageOfficerCertificate(null);
                        }}
                        message={marriageOfficerCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                  </div>
                )}
                <div className="col-md-6">
                  <div className="col-md-12">
                    <CardLabel>
                      {`${t(`CR_UPLOAD_OTHER_DOCUMENTS_TO_PROVE_SOLEMNIZATION`)}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <UploadFile
                      id={"marriage-docs"}
                      extraStyleName={"propertyCreate"}
                      accept=".jpg,.png,.pdf"
                      onUpload={selectOtherMarriageCertificate}
                      onDelete={() => {
                        setOtherMarriageCertificate(null);
                      }}
                      message={otherMarriageCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                    />
                  </div>
                </div>
              </div>
              {(groomMaritalstatusID === "MARRIED" ||
                groomMaritalstatusID === "ANNULLED" ||
                brideMaritalstatusID === "MARRIED" ||
                brideMaritalstatusID === "ANNULLED") && (
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_ALREADY_MARRIED")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {(groomMaritalstatusID === "MARRIED" || groomMaritalstatusID === "ANNULLED") && (
                        <div className="col-md-12">
                          <CardLabel>
                            {`${t("CR_UPLOAD_DIVORCE/ANNULLED_DECREE")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectGroomDivorceAnnulledDecreeCertificate}
                            onDelete={() => {
                              setGroomDivorceAnnulledDecreeCertificate(null);
                            }}
                            message={groomDivorceAnnulledDecreeCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      {(brideMaritalstatusID === "MARRIED" || brideMaritalstatusID === "ANNULLED") && (
                        <div className="col-md-12">
                          <CardLabel>
                            {`${t("CR_UPLOAD_DIVORCE/ANNULLED_DECREE")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectBrideDivorceAnnulledDecreeCertificate}
                            onDelete={() => {
                              setBrideDivorceAnnulledDecreeCertificate(null);
                            }}
                            message={brideDivorceAnnulledDecreeCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              )}
              {(expirationTypeHusband || expirationTypeWife) && (
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_SPOUSE_DIED")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {expirationTypeHusband && (
                        <div className="col-md-12">
                          <CardLabel>
                            {`${t("CR_UPLOAD_DEATH_CERTIFICATE_OF_GROOM")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectGroomExpirationCertificate}
                            onDelete={() => {
                              setGroomExpirationCertificate(null);
                            }}
                            message={groomExpirationCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      {expirationTypeWife && (
                        <div className="col-md-12">
                          <CardLabel>
                            {`${t("CR_UPLOAD_DEATH_CERTIFICATE_OF_BRIDE")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectBrideExpirationCertificate}
                            onDelete={() => {
                              setBrideExpirationCertificate(null);
                            }}
                            message={brideExpirationCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              )}
              <div className="row">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESS_DOCUMENTS")}`}</span>{" "}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="col-md-12">
                    <CardLabel>
                      {`${t("CR_WITNESS1_AADHAR")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <UploadFile
                      id={"marriage-docs"}
                      extraStyleName={"propertyCreate"}
                      accept=".jpg,.png,.pdf"
                      onUpload={selectWitness1Aadhar}
                      onDelete={() => {
                        setWitness1Aadhar(null);
                      }}
                      message={witness1Aadhar ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="col-md-12">
                    <CardLabel>
                      {`${t("CR_WITNESS2_AADHAR")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <UploadFile
                      id={"marriage-docs"}
                      extraStyleName={"propertyCreate"}
                      accept=".jpg,.png,.pdf"
                      onUpload={selectWitness2Aadhar}
                      onDelete={() => {
                        setWitness2Aadhar(null);
                      }}
                      message={witness2Aadhar ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FormStep>
      </div>
    </div>
  );
};
export default MarriageDocuments;
