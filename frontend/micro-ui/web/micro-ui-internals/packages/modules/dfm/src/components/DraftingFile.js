import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
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
    TextArea,
    CustomButton,
    CardTextButton,
    ActionBar
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchApplication from "./SearchApplication";
import Search from "../pages/employee/Search";
import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/de';
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';

const DraftingFile = ({ path, handleNext, formData, config, onSelect }) => {
    const stateId = Digit.ULBService.getStateId();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [draftText, setDraftText] = useState("");
    const { t } = useTranslation();
    const history = useHistory();
    const state = useSelector((state) => state);
    const locale = Digit.SessionStorage.get("locale");
    let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$/;
    let en_pattern = /^[a-zA-Z-.`'0-9 ]*$/;
    const mutation = Digit.Hooks.dfm.useApplicationDrafting(tenantId);
    const payload = "KL-KOCHI-C-000017- FMARISING-2023-AR";
    const { data, isLoading } = Digit.Hooks.dfm.useApplicationFetchDraft({ tenantId, id: payload });

    const draftTextValue = data?.Drafting[0]?.draftText;

    const saveDraft = () => {
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
                    roles: [{
                        id: null,
                        name: null,
                        code: "EMPLOYEE",
                        tenantId: null
                    }]
                }
            },
            Drafting: {
                uuid: null,
                tenantId: "kl.cochin",
                businessService: "DFM",
                moduleName: "fm",
                fileCode: "KL-KOCHI-C-000017- FMARISING-2023-AR",
                draftType: "Letter",
                draftText: draftText,
                assigner: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
                fileStoreId: null,
                status: "created",
                auditDetails: {
                    createdBy: null,
                    createdTime: null,
                    lastModifiedBy: null,
                    lastModifiedTime: null
                }
            }
        }
        mutation.mutate(formData)
    }

    useEffect(() => {

        if (mutation.isSuccess == true) {
            history.push("/digit-ui/employee/dfm/note-drafting")
        }
    }, [mutation.isSuccess])


    return (
        <React.Fragment>

            <div className="moduleLinkHomePageModuleLinks">

                <div className="FileFlowWrapper draft-editor" >

                    <div className="row wrapper-file" >
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="col-md-2 col-sm-12 col-xs-12"  >

                                <h3 class="type">{t("TYPE_OF_CORRESPONDENCE")}</h3>
                            </div>
                            <div className="col-md-5 col-sm-12 col-xs-12"  >

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>
                            <div className="col-md-5 col-sm-12 col-xs-12"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}

                                />

                            </div>
                        </div>


                    </div>


                    <div className="row card-file-draft">
                        <div className="col-md-12">
                            <div className="col-md-6 search-file"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>
                        </div>
                        <div class="link-file" >

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
                        </div>
                        <div class="textarea-draft" >
                            <CKEditor
                                editor={ClassicEditor}
                                data={draftText}

                                config={{
                                    removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "Table", "htmlwriter"],


                                }}

                                onChange={(event, editor) => {
                                    const data = editor.getData()

                                    setDraftText(data)
                                }}


                            />


                        </div>
                        <div class="custom-draft-button">

                            {!draftTextValue ? <CustomButton
                                onClick={saveDraft}

                                text={t("SAVE_&_GENERATE_DRAFT_REPORT")}

                            ></CustomButton> :
                                ""}
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-12" >

                            <div className="col-md-3 col-sm-4" >
                                <SubmitBar label={t("SAVE")} style={{ marginBottom: "10px" }} />
                            </div>
                            {/* <div className="col-md-3 col-sm-4 " >
                                <SubmitBar label={t("FORWARD")} style={{ marginBottom: "10px" }} />
                            </div> */}
                            <div className="col-md-3  col-sm-4"  >
                                <Dropdown
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("DEFAULT/SELECT")}
                                />

                            </div>
                        </div>

                    </div>



                </div>
            </div>
        </React.Fragment>

    );

};

export default DraftingFile;
