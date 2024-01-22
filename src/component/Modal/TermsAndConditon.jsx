import ConditionHeader from "../Condition/ConditionHeader";
import { useNavigate } from "react-router-dom";
import { userIsTermsAccepted } from "../../services/profileService";
import { useDispatch } from "react-redux";
import { setInitStocks } from "../../redux/features/stockSlice";
import { errorToast } from "../Toasts/Toasts";

const TermsAndCondition = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const termsAccepted = async function () {
    const savedUserIsTermsAcceptedResponse = await userIsTermsAccepted();
    if (savedUserIsTermsAcceptedResponse.status === 200) {
      dispatch(setInitStocks());
      navigate("/preonboarding");
    } else {
      errorToast("Something went wrong");
    }
  };
  return (
    <>
      <ConditionHeader />
      <div className="page-body px-xl-4 px-sm-2 px-0 py-lg-2 py-1 mt-1">
        <div
          className="container"
          style={{ fontFamily: "Nunito Sans,sans-serif", textAlign: "justify" }}
        >
          <div className="row g-2 mb-5">
            <div className="col-12">
              <h6 className="card-title m-0 pt-2">
                <strong>TERMS & CONDITIONS</strong>
              </h6>
              <p>
                Welcome to AlgoTIC! These terms and conditions ("Terms") govern
                your use of our website www.algotic.in, mobile apps, and any
                other related websites, products or services (collectively, the
                " AlgoTIC Platform") provided by A3D Capital LLP ("A3D," "we,"
                or "us"). You agree and acknowledge that certain parts of the
                AlgoTIC Platform, may be provided by third-party service
                providers and AlgoTIC shall not be responsible for any
                disruption of services caused by or due to such third-party
                service providers. By accessing or using our AlgoTIC Platform,
                you agree to be bound by these Terms. Please read them carefully
                before proceeding.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Acceptance of Terms</strong>
              </h6>
              <p>
                By accessing or using the AlgoTIC Platform, you acknowledge that
                you have read, understood, and agree to be bound by these Terms.
                If you do not agree to these Terms, please do not use the
                AlgoTIC Platform.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>User Eligibility</strong>
              </h6>
              <p>
                You must be at least 18 years old or have the legal capacity to
                enter into a binding contract in your jurisdiction to use the
                AlgoTIC Platform. By using the AlgoTIC Platform, you represent
                and warrant that you meet these eligibility requirements.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>User Account</strong>
              </h6>
              <p>
                You may need to create a “user account” to access certain
                features of the AlgoTIC Platform. You are responsible for
                maintaining the confidentiality of your account credentials and
                for all activities that occur under your account. You agree to
                provide accurate, current, and complete information during the
                registration process and to update such information as
                necessary. A3D reserves the right to suspend or terminate your
                account if any information provided is found to be inaccurate,
                misleading, or incomplete.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>User Conduct</strong>
              </h6>
              <p>
                You agree to use the AlgoTIC Platform in compliance with all
                applicable laws, regulations, and these Terms. You agree and
                acknowledge that you shall be considered a “user” for the
                purposes of these terms whether or not you actively accessed or
                traded using the Platform. You will be responsible for all
                activities in connection with your user account. When using the
                AlgoTIC Platform or any associated services provided on the
                platform, you shall not:
                <p className="pt-2">
                  <b>a.</b> Engage in any unlawful, fraudulent, or deceptive
                  activities.
                </p>
                <p>
                  <b>b.</b> Impersonate any person or entity, or falsely
                  represent your affiliation with any person or entity.
                </p>
                <p>
                  <b>c.</b> Post, transmit, or distribute any content that is
                  unlawful, harmful, defamatory, obscene, or otherwise
                  objectionable.
                </p>
                <p>
                  <b>d.</b> Interfere with or disrupt the integrity or
                  performance of the AlgoTIC Platform or its associated
                  services.
                </p>
                <p>
                  <b>e.</b> Upload or transmit any viruses, malware, or harmful
                  code.
                </p>
                <p>
                  <b>f.</b> Post or transmit, or cause to be posted or
                  transmitted, any communication or solicitation or other
                  "phishing", "pharming" or "whaling" message
                </p>
                <p>
                  <b>g.</b> Collect or harvest any personal or confidential
                  information of other users without their consent. You agree
                  and acknowledge that in case of any suspicious or illegal
                  activity or activity contrary to these terms, your user
                  account will be suspended without any notice. You also agree
                  that A3D has the all the rights to report any such activity
                  with the appropriate legal authorities without any notice.
                </p>
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Intellectual Property</strong>
              </h6>
              <p>
                You agree and acknowledge that all rights in the AlgoTIC
                Platform, including its content, features, and functionality,
                trademarks, logos, and any other intellectual property rights,
                are owned by A3D. You are granted a limited, non-exclusive,
                non-transferable, and revocable license to access and use the
                AlgoTIC Platform for its intended purpose. You are not
                authorized to reproduce, modify, distribute, or create
                derivative works based on the AlgoTIC Platform without A3D's
                prior written consent.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Privacy</strong>
              </h6>
              <p>
                Your privacy is important to us. Please review our Privacy
                Policy […………….] to understand how we collect, use, and disclose
                your personal information when you use the AlgoTIC Platform.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Disclaimer of Warranties</strong>
              </h6>
              <p>
                THE ALGOTIC PLATFORM IS PROVIDED "AS IS" AND WITHOUT WARRANTIES
                OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. XYZ
                DISCLAIMS ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                AND NON-INFRINGEMENT. A3D DOES NOT WARRANT THAT THE PLATFORM
                WILL BE ERROR-FREE, UNINTERRUPTED, OR SECURE, OR THAT ANY
                DEFECTS WILL BE CORRECTED.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Limitation of Liability</strong>
              </h6>
              <p>
                IN NO EVENT SHALL A3D BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES ARISING
                OUT OF OR IN CONNECTION WITH THE USE OF THE PLATFORM, EVEN IF
                A3D HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. A3D'S
                TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE
                TERMS SHALL NOT EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR
                ACCESSING OR USING THE ALGOTIC PLATFORM.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Indemnification</strong>
              </h6>
              <p>
                You agree to indemnify, defend, and hold A3D and its officers,
                directors, employees, and agents harmless from and against any
                and all claims, liabilities, damages, losses, costs, or
                expenses, including reasonable attorneys' fees, arising out of
                or in connection with your use of the AlgoTIC Platform or any
                violation of these Terms.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Termination</strong>
              </h6>
              <p>
                A3D may, at its sole discretion, suspend or terminate your
                access to the AlgoTIC Platform at any time and for any reason,
                without prior notice or liability. Upon termination, these Terms
                will continue to apply to any past use of the AlgoTIC Platform.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Governing Law and Jurisdiction</strong>
              </h6>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of India. Any disputes arising out of or in
                connection with these Terms shall be submitted to the exclusive
                jurisdiction of the courts of [………..].
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Changes to the Terms</strong>
              </h6>
              <p>
                A3D reserves the right to modify or update these Terms at any
                time, without prior notice. Any changes will be effective upon
                posting the revised Terms on the AlgoTIC Platform. Your
                continued use of the AlgoTIC Platform after the posting of any
                changes constitutes your acceptance of such changes.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Entire Agreement</strong>
              </h6>
              <p>
                These Terms constitute the entire agreement between you and A3D
                regarding the use of the AlgoTIC Platform and supersede any
                prior or contemporaneous agreements, communications, or
                understandings, whether oral or written.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Severability</strong>
              </h6>
              <p>
                If any provision of these Terms is found to be invalid, illegal,
                or unenforceable, the remaining provisions shall continue in
                full force and effect.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Waiver</strong>
              </h6>
              <p>
                The failure of A3D to enforce any right or provision of these
                Terms shall not constitute a waiver of such right or provision
                unless acknowledged and agreed to by A3D in writing.
              </p>

              <h6 className="card-title m-0 pt-2">
                <strong>Contact Us</strong>
              </h6>
              <p>
                If you have any questions or concerns regarding these Terms or
                the Platform, please contact us at [Mr. …………]
              </p>

              <h6 className="card-title mb-2 mt-4 pt-2">
                <strong>A3D Capital LLP</strong>
              </h6>

              <h6 className="card-title mb-2 pt-2">
                <strong>Golf Course Extension Road</strong>
              </h6>

              <h6 className="card-title mb-2 pt-2">
                <strong>Sector 66 Gurgaon, Haryana</strong>
              </h6>

              <h6 className="card-title mb-4 pt-2">
                <strong>Email: a3dcapital@gmail.com Ph.9899986459</strong>
              </h6>

              <button
                onClick={() => termsAccepted()}
                type="button"
                className="btn btn-lg btn-block btn-primary lift text-uppercase"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TermsAndCondition;
