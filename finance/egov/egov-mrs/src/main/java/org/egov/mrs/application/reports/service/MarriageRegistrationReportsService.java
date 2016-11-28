/*
 * eGov suite of products aim to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) <2015>  eGovernments Foundation
 *
 *     The updated version of eGov suite of products as by eGovernments Foundation
 *     is available at http://www.egovernments.org
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program. If not, see http://www.gnu.org/licenses/ or
 *     http://www.gnu.org/licenses/gpl.html .
 *
 *     In addition to the terms of the GPL license to be adhered to in using this
 *     program, the following additional terms are to be complied with:
 *
 *         1) All versions of this program, verbatim or modified must carry this
 *            Legal Notice.
 *
 *         2) Any misrepresentation of the origin of the material is prohibited. It
 *            is required that all modified versions of this material be marked in
 *            reasonable ways as different from the original version.
 *
 *         3) This license does not grant any rights to any user of the program
 *            with regards to rights under trademark law for use of the trade names
 *            or trademarks of eGovernments Foundation.
 *
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */

package org.egov.mrs.application.reports.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.egov.mrs.application.reports.repository.MarriageRegistrationReportsRepository;
import org.egov.mrs.domain.entity.MarriageCertificate;
import org.egov.mrs.domain.entity.MarriageRegistration;
import org.egov.mrs.domain.enums.MaritalStatus;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class MarriageRegistrationReportsService {
    
    final SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    
    @PersistenceContext
    private EntityManager entityManager;

    private Session getCurrentSession() {
        return entityManager.unwrap(Session.class);
    }

    @Autowired
    private MarriageRegistrationReportsRepository registrationReportsRepository;

    @SuppressWarnings("unchecked")
    public List<Object[]> searchMarriageRegistrationsForCertificateReport(final MarriageCertificate certificate)
            throws ParseException {

        final Map<String, String> params = new HashMap<String, String>();

        final StringBuilder queryStrForRegistration = new StringBuilder(500);
        queryStrForRegistration
                .append(
                "Select reg.registrationno,reg.dateofmarriage,reg.applicationdate,reg.rejectionreason,cert.certificateno,cert.certificatetype,cert.certificatedate, brndy.name,(Select concat(concat(concat(app.firstname, ' '), app.middlename, ' '), app.lastname) as hus_name from egmrs_applicant app where app.id = reg.husband),(Select concat(concat(concat(app.firstname, ' '), app.middlename, ' '), app.lastname) as wife_name from egmrs_applicant app where app.id = reg.wife),reg.id");
        queryStrForRegistration
                .append(" from egmrs_registration reg, egmrs_certificate cert, eg_boundary brndy,egw_status st");
        queryStrForRegistration
                .append(
                " where reg.zone = brndy.id and reg.status = st.id and st.code in('REGISTERED')  and reg.id = cert.registration and cert.reissue is null ");
        if (certificate.getRegistration().getZone() != null) {
            queryStrForRegistration.append(" and reg.zone=to_number(:zone,'999999')");
            params.put("zone", String.valueOf(certificate.getRegistration().getZone().getId()));
        }

        if (certificate.getCertificateType() != null && !certificate.getCertificateType().equals("ALL")) {
            queryStrForRegistration.append(" and cert.certificatetype=:certificatetype");
            params.put("certificatetype", certificate.getCertificateType());
        } else if (certificate.getCertificateType() != null && certificate.getCertificateType().equals("ALL"))
            queryStrForRegistration.append(" and cert.certificatetype in('REGISTRATION','REISSUE','REJECTION')");

        if (certificate.getFromDate() != null && certificate.getToDate() != null) {
            queryStrForRegistration
                    .append(
                    " and cert.certificatedate between to_timestamp(:fromDate,'yyyy-MM-dd HH24:mi:ss') and to_timestamp(:toDate,'YYYY-MM-DD HH24:MI:SS')");
            params.put("fromDate", sf.format(certificate.getFromDate()));
            params.put("toDate", certificate.getToDate() != null ? sf.format(certificate.getToDate())
                    : sf.format(new Date()));
        }

        if (certificate.getRegistration().getRegistrationNo() != null) {
            queryStrForRegistration.append(" and reg.registrationno=:registrationNo");
            params.put("registrationNo", certificate.getRegistration().getRegistrationNo());
        }

        final StringBuilder queryStrForReissue = new StringBuilder(500);
        queryStrForReissue
                .append(
                "Select reg.registrationno,reg.dateofmarriage,reg.applicationdate,reg.rejectionreason,cert.certificateno,cert.certificatetype,cert.certificatedate, brndy.name,(Select concat(concat(concat(app.firstname, ' '), app.middlename, ' '), app.lastname) as hus_name from egmrs_applicant app where app.id = reg.husband),(Select concat(concat(concat(app.firstname, ' '), app.middlename, ' '), app.lastname) as wife_name from egmrs_applicant app where app.id = reg.wife),reg.id");
        queryStrForReissue.append(
                " from egmrs_registration reg,egmrs_reissue reis, egmrs_certificate cert, eg_boundary brndy,egw_status st ");
        queryStrForReissue
                .append(
                "where reg.zone = brndy.id and reg.id=reis.registration and reis.status = st.id and st.code in('CERTIFICATEREISSUED','REJECTION')  and reis.id = cert.reissue and cert.registration is null");
        if (certificate.getRegistration().getZone() != null) {
            queryStrForReissue.append(" and reg.zone=to_number(:zone,'999999')");
            params.put("zone", String.valueOf(certificate.getRegistration().getZone().getId()));
        }

        if (certificate.getCertificateType() != null && !certificate.getCertificateType().equals("ALL")) {
            queryStrForReissue.append(" and cert.certificatetype=:certificatetype");
            params.put("certificatetype", certificate.getCertificateType());
        } else if (certificate.getCertificateType() != null && certificate.getCertificateType().equals("ALL"))
            queryStrForReissue.append(" and cert.certificatetype in('REGISTRATION','REISSUE','REJECTION')");

        if (certificate.getFromDate() != null && certificate.getToDate() != null) {
            queryStrForReissue
                    .append(
                    " and cert.certificatedate between to_timestamp(:fromDate,'yyyy-MM-dd HH24:mi:ss') and to_timestamp(:toDate,'YYYY-MM-DD HH24:MI:SS')");
            params.put("fromDate", sf.format(certificate.getFromDate()).toString());
            params.put("toDate", certificate.getToDate() != null ? sf.format(certificate.getToDate()).toString()
                    : sf.format(new Date()).toString());
        }

        if (certificate.getRegistration().getRegistrationNo() != null) {
            queryStrForReissue.append(" and reg.registrationno=:registrationNo");
            params.put("registrationNo", certificate.getRegistration().getRegistrationNo());
        }

        final StringBuilder aggregateQueryStr = new StringBuilder();
        aggregateQueryStr.append(queryStrForRegistration.toString());

        aggregateQueryStr.append(" union ");
        aggregateQueryStr.append(queryStrForReissue.toString());

        final org.hibernate.Query query = getCurrentSession().createSQLQuery(aggregateQueryStr.toString());
        for (final String param : params.keySet())
            query.setParameter(param, params.get(param));
        return query.list();

    }

    public String[] searchRegistrationOfHusbandAgeWise(final int year) throws ParseException {

        return registrationReportsRepository.getHusbandCountAgeWise(year);
    }

    public String[] searchRegistrationOfWifeAgeWise(final int year) throws ParseException {

        return registrationReportsRepository.getWifeCountAgeWise(year);
    }

    public String[] searchRegistrationActWise(final MarriageRegistration registration, final int year) throws ParseException {

        return registrationReportsRepository.searchMarriageRegistrationsByYearAndAct(year, registration.getMarriageAct().getId());
    }

    @SuppressWarnings("unchecked")
    public List<MarriageRegistration> getAgewiseDetails(final String age, final String applicant, final int year)
            throws ParseException {
        final Criteria criteria = getCurrentSession().createCriteria(MarriageRegistration.class,
                "marriageRegistration");
        final String[] values = age.split("-");

        final SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        final Date fromDate = formatter.parse(year + "/" + 1 + "/" + 1);
        final Date toDate = formatter.parse(year + "/" + 12 + "/" + 31);
        if (age != null && applicant.equals("husband")) {
            criteria.createAlias("marriageRegistration.husband", "husband").add(Restrictions
                    .between("husband.ageInYearsAsOnMarriage", Integer.valueOf(values[0]), Integer.valueOf(values[1])));
            criteria.add(Restrictions.between("marriageRegistration.applicationDate", fromDate, toDate));
        } else {
            criteria.createAlias("marriageRegistration.wife", "wife").add(Restrictions
                    .between("wife.ageInYearsAsOnMarriage", Integer.valueOf(values[0]), Integer.valueOf(values[1])));
            criteria.add(Restrictions.between("marriageRegistration.applicationDate", fromDate, toDate));
        }
        criteria.createAlias("marriageRegistration.status", "status").add(Restrictions.in("status.code",
                new String[] { MarriageRegistration.RegistrationStatus.APPROVED.toString() }));
        return criteria.list();
    }

    @SuppressWarnings("unchecked")
    public List<MarriageRegistration> searchStatusAtTimeOfMarriage(final MarriageRegistration registration)
            throws ParseException {
        final Criteria criteria = getCurrentSession().createCriteria(MarriageRegistration.class, "marriageRegistration")
                .createAlias("marriageRegistration.status", "status");
        if (registration.getHusband().getMaritalStatus() != null)
            criteria.createAlias("marriageRegistration.husband", "husband")
                    .add(Restrictions.eq("husband.maritalStatus", registration.getHusband().getMaritalStatus()));
        criteria.createAlias("marriageRegistration.wife", "wife")
                .add(Restrictions.eq("wife.maritalStatus", registration.getHusband().getMaritalStatus()));

        criteria.add(Restrictions.in("status.code",
                new String[] { MarriageRegistration.RegistrationStatus.REGISTERED.toString() }));
        return criteria.list();
    }

    @SuppressWarnings("unchecked")
    public List<String[]> getHusbandCountByMaritalStatus(final Date fromDate,final Date toDate,String maritalStatus,String applicanType) throws ParseException {
        final Map<String, String> params = new HashMap<String, String>();
        final StringBuilder queryStrForHusbandCount = new StringBuilder(500);
        queryStrForHusbandCount
                .append(
                "select app.relationstatus,to_char(app.createddate,'Mon'),count(*) from egmrs_applicant as app ,egmrs_registration as reg where reg.husband = app.id  ");
       if(maritalStatus != null){
           queryStrForHusbandCount.append(" and app.relationstatus=:maritalStatus");
           params.put("maritalStatus", maritalStatus);
       }else if(fromDate != null && toDate != null){
           queryStrForHusbandCount
           .append(
           " and app.createddate between to_timestamp(:fromDate,'yyyy-MM-dd HH24:mi:ss') and to_timestamp(:toDate,'YYYY-MM-DD HH24:MI:SS')");
           params.put("fromDate", sf.format(fromDate));
           params.put("toDate", sf.format(toDate));
       }
       
       queryStrForHusbandCount.append(" group by app.relationstatus, to_char(app.createddate,'Mon') order by to_char(app.createddate,'Mon') desc");
       final org.hibernate.Query query = getCurrentSession().createSQLQuery(queryStrForHusbandCount.toString());
       for (final String param : params.keySet())
           query.setParameter(param, params.get(param)); 
       return query.list();
    }

    @SuppressWarnings("unchecked")
    public List<String[]> getWifeCountByMaritalStatus(final Date fromDate,final Date toDate,String maritalStatus,String applicanType) throws ParseException {

        final Map<String, String> params = new HashMap<String, String>();
        final StringBuilder queryStrForWifeCount = new StringBuilder(500);
        queryStrForWifeCount
                .append(
                "select app.relationstatus,to_char(app.createddate,'Mon'),count(*) from egmrs_applicant as app ,egmrs_registration as reg where reg.wife = app.id  ");
       if(maritalStatus != null){
           queryStrForWifeCount.append(" and app.relationstatus=:maritalStatus");
           params.put("maritalStatus", maritalStatus);
       }else if(fromDate != null && toDate != null){
           queryStrForWifeCount
           .append(
           " and app.createddate between to_timestamp(:fromDate,'yyyy-MM-dd HH24:mi:ss') and to_timestamp(:toDate,'YYYY-MM-DD HH24:MI:SS')");
           params.put("fromDate", sf.format(fromDate));
           params.put("toDate", sf.format(toDate));
       }
       
       queryStrForWifeCount.append(" group by app.relationstatus, to_char(app.createddate,'Mon') order by to_char(app.createddate,'Mon') desc");
       final org.hibernate.Query query = getCurrentSession().createSQLQuery(queryStrForWifeCount.toString());
       for (final String param : params.keySet())
           query.setParameter(param, params.get(param)); 
       return query.list();
    
    }

    @SuppressWarnings("unchecked")
    public List<MarriageRegistration> getByMaritalStatusDetails(final String applicant,
            final String maritalStatus,final Date fromDate,final Date toDate) throws ParseException {
         Criteria criteria = getCurrentSession().createCriteria(MarriageRegistration.class,
                "marriageRegistration");

        if (maritalStatus != null && applicant.equals("husband")) {
            criteria = criteria.createAlias("marriageRegistration.husband", "husband");
            if(fromDate != null && toDate != null){
            criteria.add(Restrictions.between("husband.createdDate", fromDate, toDate));
            }
            criteria.add(Restrictions.eq("husband.maritalStatus", MaritalStatus.valueOf(maritalStatus)));
        } else {
            criteria =  criteria.createAlias("marriageRegistration.wife", "wife");
            if(fromDate != null && toDate != null) {
            criteria.add(Restrictions.between("wife.createdDate", fromDate, toDate));
            }
            if(maritalStatus != null) {
            criteria.add(Restrictions.eq("wife.maritalStatus", MaritalStatus.valueOf(maritalStatus)));
            }
        }

        return criteria.list();
    }

    @SuppressWarnings("unchecked")
    public List<MarriageRegistration> searchRegistrationBydate(
            final MarriageRegistration registration) throws ParseException {
        final Criteria criteria = getCurrentSession().createCriteria(
                MarriageRegistration.class, "marriageRegistration");

        if (null != registration.getMarriageRegistrationUnit()
                && registration.getMarriageRegistrationUnit().getId() != null)
            criteria.add(Restrictions.eq("marriageRegistrationUnit.id",
                    registration.getMarriageRegistrationUnit().getId()));
        if (null != registration.getZone()
                && registration.getZone().getId() != null)
            criteria.add(Restrictions.eq("zone.id", registration.getZone()
                    .getId()));
        if (null != registration.getStatus()
                && registration.getStatus().getCode() != null)
            criteria.createAlias("marriageRegistration.status", "status").add(
                    Restrictions.eq("status.code", registration.getStatus()
                            .getCode()));
        if (registration.getFromDate() != null
                && registration.getToDate() != null)
            criteria.add(Restrictions.between(
                    "marriageRegistration.applicationDate",
                    registration.getFromDate(), org.apache.commons.lang3.time.DateUtils.addDays(registration.getToDate(), 1)));
        criteria.addOrder(Order.desc("marriageRegistration.applicationDate"));
        if (registration.getFromDate() != null && registration.getToDate() == null)
        {

            final Calendar cal = Calendar.getInstance();
            final Date todate = cal.getTime();
            criteria.add(Restrictions.between(
                    "marriageRegistration.applicationDate",
                    registration.getFromDate(), todate));
        }
        if (registration.getFromDate() == null && registration.getToDate() != null)
        {
            final Calendar cal = Calendar.getInstance();
            cal.set(Calendar.YEAR, 2009);
            final Date fromdate = cal.getTime();

            criteria.add(Restrictions.between(
                    "marriageRegistration.applicationDate",
                    fromdate, org.apache.commons.lang3.time.DateUtils.addDays(registration.getToDate(), 1)));
        }

        return criteria.list();
    }

    public Date getMonthStartday(final String monthyear) {
        Date monthStartDate = new Date();
        if (monthyear != null) {
            final String[] month_year = monthyear.split("/");
            final Calendar calnew = Calendar.getInstance();
            calnew.set(Calendar.MONTH, Integer.parseInt(month_year[0]) - 1);
            calnew.set(Calendar.YEAR, Integer.parseInt(month_year[1]));
            calnew.set(Calendar.DAY_OF_MONTH,
                    calnew.getActualMinimum(Calendar.DAY_OF_MONTH));
            monthStartDate = calnew.getTime();

        }
        return monthStartDate;
    }

    public Date getMonthEndday(final String monthyear) {
        Date monthEndDate = new Date();
        if (monthyear != null) {
            final String[] month_year = monthyear.split("/");
            final Calendar calnew = Calendar.getInstance();
            calnew.set(Calendar.MONTH, Integer.parseInt(month_year[0]) - 1);
            calnew.set(Calendar.YEAR, Integer.parseInt(month_year[1]));
            calnew.set(Calendar.DAY_OF_MONTH,
                    calnew.getActualMaximum(Calendar.DAY_OF_MONTH));
            monthEndDate = calnew.getTime();

        }
        return monthEndDate;
    }

    @SuppressWarnings("unchecked")
    public List<MarriageRegistration> searchRegistrationBymonth(
            final MarriageRegistration registration) throws ParseException {
        final Criteria criteria = getCurrentSession().createCriteria(
                MarriageRegistration.class, "marriageRegistration").createAlias("marriageRegistration.status", "status");
        if (registration.getMonth_year() != null)
            criteria.add(Restrictions.between(
                    "marriageRegistration.applicationDate",
                    getMonthStartday(registration.getMonth_year()),
                    getMonthEndday(registration.getMonth_year())));

        if (null != registration.getMarriageRegistrationUnit()
                && registration.getMarriageRegistrationUnit().getId() != null)
            criteria.add(Restrictions.eq("marriageRegistrationUnit.id",
                    registration.getMarriageRegistrationUnit().getId()));
        if (null != registration.getZone()
                && registration.getZone().getId() != null)
            criteria.add(Restrictions.eq("zone.id", registration.getZone()
                    .getId()));
        criteria.add(Restrictions
                .in("status.code",
                        new String[] { MarriageRegistration.RegistrationStatus.APPROVED
                                .toString() }));
        return criteria.list();
    }

    @SuppressWarnings("unchecked")
    public List<MarriageRegistration> searchRegistrationByreligion(
            final MarriageRegistration registration, final int year) throws ParseException {
        final Criteria criteria = getCurrentSession().createCriteria(
                MarriageRegistration.class, "marriageRegistration")
                .createAlias("marriageRegistration.status", "status");
        final SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        final Date fromDate = formatter.parse(year + "/" + 1 + "/" + 1);
        final Date toDate = formatter.parse(year + "/" + 12 + "/" + 31);
        if (null != registration.getHusband().getReligion()
                && registration.getHusband().getReligion().getId() != null)
            criteria.createAlias("marriageRegistration.husband", "husband")
                    .add(Restrictions.eq("husband.religion.id", registration
                            .getHusband().getReligion().getId()));
        if (null != registration.getWife().getReligion()
                && registration.getWife().getReligion().getId() != null)
            criteria.createAlias("marriageRegistration.wife", "wife").add(
                    Restrictions.eq("wife.religion.id", registration.getWife()
                            .getReligion().getId()));
        if (null != fromDate && null != toDate)
            criteria.add(Restrictions.between(
                    "marriageRegistration.applicationDate", fromDate, toDate));

        criteria.add(Restrictions.in("status.code",
                new String[] { MarriageRegistration.RegistrationStatus.APPROVED
                        .toString() }));
        return criteria.list();
    }

    public String[] searchRegistrationMrActWise(final int year) {
        return registrationReportsRepository.searchMarriageRegistrationsByYear(year);

    }

    @SuppressWarnings("unchecked")
    public List<MarriageRegistration> getActwiseDetails(final int year, final String act)
            throws ParseException {
        final Criteria criteria = getCurrentSession().createCriteria(
                MarriageRegistration.class, "marriageRegistration").createAlias("marriageRegistration.status", "status");

        final SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        final Date fromDate = formatter.parse(year + "/" + 1 + "/" + 1);
        final Date toDate = formatter.parse(year + "/" + 12 + "/" + 31);
        if (act != null)
            criteria.createAlias("marriageRegistration.marriageAct",
                    "marriageAct")
                    .add(Restrictions.eq("marriageAct.name", act));
        if (fromDate != null && toDate != null)
            criteria.add(Restrictions.between(
                    "marriageRegistration.applicationDate", fromDate, toDate));

        criteria.add(Restrictions.in("status.code",
                new String[] { MarriageRegistration.RegistrationStatus.APPROVED.toString() }));
        return criteria.list();

    }

    @SuppressWarnings("unchecked")
    public List<MarriageRegistration> getmonthWiseActDetails(final int year,
            final int month, final Long actid) throws ParseException {
        final Criteria criteria = getCurrentSession().createCriteria(
                MarriageRegistration.class, "marriageRegistration").createAlias("marriageRegistration.status", "status");
        final String month_year = month + "/" + year;
        if (actid != null)
            criteria.createAlias("marriageRegistration.marriageAct",
                    "marriageAct")
                    .add(Restrictions.eq("marriageAct.id", actid));
        if (month_year != null)
            criteria.add(Restrictions.between("marriageRegistration.applicationDate", getMonthStartday(month_year),
                    getMonthEndday(month_year)));
        criteria.add(Restrictions.in("status.code",
                new String[] { MarriageRegistration.RegistrationStatus.APPROVED.toString() }));
        return criteria.list();
    }

}
