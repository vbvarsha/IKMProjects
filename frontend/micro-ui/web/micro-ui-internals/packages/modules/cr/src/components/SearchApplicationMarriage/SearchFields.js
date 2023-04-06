import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import {DatePicker, Dropdown, SearchField, SubmitBar, TextInput} from "@egovernments/digit-ui-react-components";

const SearchFields = ({
                          t,
                          register,
                          control,
                          reset,
                          previousPage
                      }) => {

    let validation = {};
    const cmbPlace = [
        { i18nKey: "Religious Institution", name: "RELIGIOUSINSTITUTION", namelocal: "മത സ്ഥാപനം" },
        {
            i18nKey: "Mandapam/Hall/Auditorium/Convention Centre",
            name: "MANDAPAM/HALL/AUDITORIUM/CONVENTIONALCENTRE",
            namelocal: "മണ്ഡപം/ ഹാൾ / ഓഡിറ്റോറിയം",
        },
        { i18nKey: "Sub Registrar's Office", name: "SUBREGISTRARSOFFICE", namelocal: "സബ് രജിസ്ട്രാർ ഓഫീസ്" },
        { i18nKey: "House", name: "HOUSE", namelocal: "വീട്" },
        { i18nKey: "Private Place", name: "PRIVATEPLACE", namelocal: "സ്വകാര്യ സ്ഥലം" },
        { i18nKey: "Public Place", name: "PUBLICPLACE", namelocal: "പൊതു സ്ഥലം" },
    ];


    return (
        <>
            <SearchField>
                <label> {t("APPLICATION NO")}</label>
                <TextInput name="applicationNo" inputRef={register({})}
                           placeholder={`${t("Application No")}`}
                           {...(validation = { isRequired: false, type: "text", title: t("Invalid Application No.") })}/>
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("DATE OF MARRIAGE")}</label>
                <Controller
                    render={(props) => <DatePicker date={props.value} onChange={props.onChange} {...(validation = { pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}", isRequired: false, title: t("CR_INVALID_DATE") })} />}
                    name="marriageDOM"
                    control={control}
                />
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("FIRST NAME OF HUSBAND")}</label>
                <TextInput name="groomFirstnameEn" inputRef={register({})} placeholder={`${t("Name Of Husband")}`}
                           {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("Invalid Husband name") })} />
            </SearchField>
            <SearchField>
                <label><span className="mandatorycss">*</span> {t("FIRST NAME OF WIFE")}</label>
                <TextInput name="brideFirstnameEn" inputRef={register({})} placeholder={`${t("Name Of Wife")}`}
                           {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("Invalid Wife name") })} />
            </SearchField>
            <SearchField>
                <label> {t("PLACE OF MARRIAGE")}</label>
                <Controller
                    control={control}
                    name="placeOfMarriage"
                    render={(props) => (
                        <Dropdown
                            selected={props.value}
                            select={props.onChange}
                            onBlur={props.onBlur}
                            option={cmbPlace}
                            optionKey="i18nKey"
                            t={t}
                            placeholder={`${t("CR_MARRIAGE_PLACE_TYPE")}`}
                            {...(validation = { isRequired: false, title: t("CS_INVALID_MARRIAGE_PLACE_TYPE") })}
                        />
                    )}
                />
            </SearchField>
            <SearchField className="submit">
                <SubmitBar label={t("ES_COMMON_SEARCH")} submit />
                <p onClick={() => {
                    reset({
                        applicationNo: "",
                        marriageDOM: "",
                        groomFirstnameEn: "",
                        brideFirstnameEn: "",
                        placeOfMarriage: "",
                    });
                    previousPage();
                }}>{t(`ES_COMMON_CLEAR_ALL`)}</p>
            </SearchField>
        </>
    )

};

export default SearchFields
