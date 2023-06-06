import { Dropdown, Hamburger, TopBar as TopBarComponent, NotificationBell } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import ChangeCity from "../ChangeCity";
import ChangeLanguage from "../ChangeLanguage";

const TextToImg = (props) => (
  <span className="user-img-txt" onClick={props.toggleMenu} title={props.name}>
    {props.name[0].toUpperCase()}
  </span>
);
const TopBar = ({
  t,
  stateInfo,
  toggleSidebar,
  isSidebarOpen,
  handleLogout,
  userDetails,
  CITIZEN,
  cityDetails,
  mobileView,
  userOptions,
  handleUserDropdownSelection,
  logoUrl,
  showLanguageChange = true,
}) => {
  const [profilePic, setProfilePic] = React.useState(null);

  React.useEffect(async () => {
    const tenant = Digit.ULBService.getCurrentTenantId();
    const uuid = userDetails?.info?.uuid;
    if (uuid) {
      const usersResponse = await Digit.UserService.userSearch(tenant, { uuid: [uuid] }, {});
      if (usersResponse && usersResponse.user && usersResponse.user.length) {
        const userDetails = usersResponse.user[0];
        const thumbs = userDetails?.photo?.split(",");
        setProfilePic(thumbs?.at(0));
      }
    }
  }, [profilePic !== null, userDetails?.info?.uuid]);

  const CitizenHomePageTenantId = Digit.ULBService.getCitizenCurrentTenant(true);

  let history = useHistory();
  const { pathname } = useLocation();

  const conditionsToDisableNotificationCountTrigger = () => {
    if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
    if (Digit.UserService?.getUser()?.info?.type === "CITIZEN") {
      if (!CitizenHomePageTenantId) return false;
      else return true;
    }
    return false;
  };

  const { data: { unreadCount: unreadNotificationCount } = {}, isSuccess: notificationCountLoaded } = Digit.Hooks.useNotificationCount({
    tenantId: CitizenHomePageTenantId,
    config: {
      enabled: conditionsToDisableNotificationCountTrigger(),
    },
  });

  const updateSidebar = () => {
    if (!Digit.clikOusideFired) {
      toggleSidebar(true);
    } else {
      Digit.clikOusideFired = false;
    }
  };

  function onNotificationIconClick() {
    history.push("/digit-ui/citizen/engagement/notifications");
  }

  const urlsToDisableNotificationIcon = (pathname) =>
    !!Digit.UserService?.getUser()?.access_token
      ? false
      : ["/digit-ui/citizen/select-language", "/digit-ui/citizen/select-location"].includes(pathname);

  if (CITIZEN) {
    const isMobile = true;
    return (
      // <TopBarComponent
      //   img={stateInfo?.logoUrlWhite}
      //   isMobile={true}
      //   toggleSidebar={updateSidebar}
      //   logoUrl={stateInfo?.logoUrlWhite}
      //   onLogout={handleLogout}
      //   userDetails={userDetails}
      //   notificationCount={unreadNotificationCount < 99 ? unreadNotificationCount : 99}
      //   notificationCountLoaded={notificationCountLoaded}
      //   cityOfCitizenShownBesideLogo={t(CitizenHomePageTenantId)}
      //   onNotificationIconClick={onNotificationIconClick}
      //   hideNotificationIconOnSomeUrlsWhenNotLoggedIn={urlsToDisableNotificationIcon(pathname)}
      //   cityDetails={cityDetails}
      //   showLanguageChange={showLanguageChange}
      //   t={t}
      // />
      <div className="topnavbar">
        <div className="mainNav">
          <div className="bg-nav">
            <div className="center-nav">
              <div className="top-container">
                {isMobile && (
                  <span style={{ marginRight: "10px" }} className="cp" onClick={updateSidebar}>
                    {/* <HamburgerIcon styles={{ display: "inline" }} color={color} /> */}
                    <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/bars.svg" alt="" />
                  </span>
                )}
                <img className="city" id="topbar-logo" src="https://ulb-logos.s3.ap-south-1.amazonaws.com/k-smart-logo.png" alt="K-SMART" />
                <hr className="line-nav" />
                <h3 className="tenant-id">{t(CitizenHomePageTenantId)}</h3>
              </div>
              <div className="leftContainerNav">
                <span style={{ marginRight: "5px"}}>
                  <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/new-translate.svg" alt="image" />
                </span>
                <div className="left" style={{ marginRight: "20px" }}>
                  <ChangeLanguage dropdown={true} />
                </div>
                <div className="RightMostTopBarOptions">
                  {!urlsToDisableNotificationIcon(pathname) ? (
                    <div className="EventNotificationWrapper" onClick={onNotificationIconClick}>
                      {notificationCountLoaded && unreadNotificationCount ? (
                        <span>
                          <p>{unreadNotificationCount < 99 ? unreadNotificationCount : 99}</p>
                        </span>
                      ) : null}
                      {/* <NotificationBell /> */}
                      <span>
                        <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/notification-icons.svg" alt="" />
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const loggedin = userDetails?.access_token ? true : false;
  const user = { name: userDetails?.info?.name };
  return (
    <div className="topbar">
      {mobileView ? <Hamburger handleClick={toggleSidebar} color="#9E9E9E" /> : null}
      <div style={{ borderRight: "1px solid #edf2f9", width: "3%" }}>
        <img className="city" src={loggedin ? cityDetails?.logoId : stateInfo?.statelogo} />
      </div>

      <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingLeft: "120px" }}>
        {loggedin &&
          (cityDetails?.city?.ulbGrade ? (
            <p className="ulb" style={mobileView ? { fontSize: "14px", display: "inline-block" } : {}}>
              {t(cityDetails?.i18nKey).toUpperCase()}{" "}
              {t(`ULBGRADE_${cityDetails?.city?.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`).toUpperCase()}
            </p>
          ) : (
            <img className="state" src={logoUrl} />
          ))}
        {!loggedin && (
          <p className="ulb" style={mobileView ? { fontSize: "14px", display: "inline-block" } : {}}>
            {t(`MYCITY_${stateInfo?.code?.toUpperCase()}_LABEL`)} {t(`MYCITY_STATECODE_LABEL`)}
          </p>
        )}
        {!mobileView && (
          <div className={mobileView ? "right" : "flex-right right w-80 column-gap-15"} style={!loggedin ? { width: "80%" } : {}}>
            <div className="left">
              {!window.location.href.includes("employee/user/login") && !window.location.href.includes("employee/user/language-selection") && (
                <ChangeCity dropdown={true} t={t} />
              )}
            </div>
            <div className="left">{showLanguageChange && <ChangeLanguage dropdown={true} />}</div>
            {userDetails?.access_token && (
              <div className="">
                <Dropdown
                  option={userOptions}
                  optionKey={"name"}
                  select={handleUserDropdownSelection}
                  showArrow={true}
                  freeze={true}
                  selected={user}
                  style={mobileView ? { right: 0 } : {}}
                  optionCardStyles={{ overflow: "revert" }}
                  customSelector={
                    profilePic == null ? (
                      <React.Fragment>
                        <TextToImg name={userDetails?.info?.name || userDetails?.info?.userInfo?.name || "Employee"} />
                        <div style={{ display: "block" }}>
                          <p>{userDetails?.info?.name}</p>
                          <p>
                            <small>{userDetails?.info?.roles[0]?.name}</small>
                          </p>
                        </div>
                      </React.Fragment>
                    ) : (
                      <img src={profilePic} style={{ height: "48px", width: "48px", borderRadius: "50%" }} />
                    )
                  }
                />
              </div>
            )}
          </div>
        )}
      </span>
    </div>
  );
};

export default TopBar;
