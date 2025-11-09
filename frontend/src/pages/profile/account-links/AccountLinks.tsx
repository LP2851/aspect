import "./AccountLinks.css";

import { useApolloClient } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "../../../auth/AuthProvider.tsx";
import Button from "../../../components/button/Button.tsx";
import Toast from "../../../components/toast/Toast.tsx";
import {
  YouTubeAuthUrlDocument,
  type YouTubeAuthUrlQueryResult,
  // TikTokAuthUrlDocument,
  // type TikTokAuthUrlQueryResult,
  // InstagramAuthUrlDocument,
  // type InstagramAuthUrlQueryResult,
  // FacebookAuthUrlDocument,
  // type FacebookAuthUrlQueryResult,
  // XAuthUrlDocument,
  // type XAuthUrlQueryResult,
} from "../../../generated/graphql";
import {
  isFeatureFacebookEnabled,
  isFeatureInstagramEnabled,
  isFeatureTikTokEnabled,
  isFeatureXEnabled,
  isFeatureYouTubeEnabled,
} from "../../../utils/features.ts";

const AccountLinks = () => {
  const { user } = useAuth();
  const client = useApolloClient();
  const location = useLocation();
  const navigate = useNavigate();
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [facebookConnected, setFacebookConnected] = useState(false);
  const [xConnected, setXConnected] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Check connection status for all platforms when user data changes
  useEffect(() => {
    if (user?.tokens) {
      const hasYouTubeToken = user.tokens.some(
        (token) => token.tokenFor === "YOUTUBE",
      );
      const hasTikTokToken = user.tokens.some(
        (token) => token.tokenFor === "TIK_TOK",
      );
      const hasInstagramToken = user.tokens.some(
        (token) => token.tokenFor === "INSTAGRAM",
      );
      const hasFacebookToken = user.tokens.some(
        (token) => token.tokenFor === "FACEBOOK",
      );
      const hasXToken = user.tokens.some((token) => token.tokenFor === "X");

      setYoutubeConnected(hasYouTubeToken);
      setTiktokConnected(hasTikTokToken);
      setInstagramConnected(hasInstagramToken);
      setFacebookConnected(hasFacebookToken);
      setXConnected(hasXToken);
    } else {
      setYoutubeConnected(false);
      setTiktokConnected(false);
      setInstagramConnected(false);
      setFacebookConnected(false);
      setXConnected(false);
    }
  }, [user]);

  // Handle OAuth callback results
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const success = urlParams.get("success");
    const error = urlParams.get("error");

    if (success) {
      let platform = "";
      let connected = false;

      switch (success) {
        case "youtube_connected":
          platform = "YouTube";
          setYoutubeConnected(true);
          connected = true;
          break;
        case "tiktok_connected":
          platform = "TikTok";
          setTiktokConnected(true);
          connected = true;
          break;
        case "instagram_connected":
          platform = "Instagram";
          setInstagramConnected(true);
          connected = true;
          break;
        case "facebook_connected":
          platform = "Facebook";
          setFacebookConnected(true);
          connected = true;
          break;
        case "x_connected":
          platform = "X";
          setXConnected(true);
          connected = true;
          break;
      }

      if (connected) {
        setNotification({
          type: "success",
          message: `${platform} account successfully connected!`,
        });
        // Clean up URL
        navigate(location.pathname, { replace: true });
      }
    } else if (error) {
      let errorMessage = "Failed to connect account.";
      let platform = "Account";

      switch (error) {
        case "youtube_not_authenticated":
          platform = "YouTube";
          errorMessage =
            "Please make sure you're logged in and using the same email address.";
          break;
        case "tiktok_not_authenticated":
          platform = "TikTok";
          errorMessage =
            "Please make sure you're logged in and using the same email address.";
          break;
        case "instagram_not_authenticated":
          platform = "Instagram";
          errorMessage =
            "Please make sure you're logged in and using the same email address.";
          break;
        case "facebook_not_authenticated":
          platform = "Facebook";
          errorMessage =
            "Please make sure you're logged in and using the same email address.";
          break;
        case "x_not_authenticated":
          platform = "X";
          errorMessage =
            "Please make sure you're logged in and using the same email address.";
          break;
        case "callback_failed":
          errorMessage = "OAuth callback failed. Please try again.";
          break;
        case "error":
          errorMessage = "An error occurred during authentication.";
          break;
        default:
          errorMessage = `Failed to connect ${platform} account.`;
      }

      setNotification({
        type: "error",
        message: errorMessage,
      });
      // Clean up URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const socialPlatforms = [
    { label: "TikTok", value: "TIK_TOK", enabled: isFeatureTikTokEnabled() },
    { label: "YouTube", value: "YOUTUBE", enabled: isFeatureYouTubeEnabled() },
    {
      label: "Instagram",
      value: "INSTAGRAM",
      enabled: isFeatureInstagramEnabled(),
    },
    {
      label: "Facebook",
      value: "FACEBOOK",
      enabled: isFeatureFacebookEnabled(),
    },
    { label: "X", value: "X", enabled: isFeatureXEnabled() },
  ].filter((platform) => platform.enabled);

  const handleYouTubeOAuth = async () => {
    try {
      const { data } = (await client.query({
        query: YouTubeAuthUrlDocument,
      })) as YouTubeAuthUrlQueryResult;
      console.log(data);
      window.location.href = data?.youtubeAuthUrl || "";
    } catch (error) {
      console.error("Failed to get YouTube auth URL:", error);
    }
  };

  const handleTikTokOAuth = async () => {
    try {
      alert("TikTok is not yet supported");
      // const { data } = (await client.query({
      //   query: TikTokAuthUrlDocument,
      // })) as TikTokAuthUrlQueryResult;
      // console.log(data);
      // window.location.href = data?.tiktokAuthUrl || "";
    } catch (error) {
      console.error("Failed to get TikTok auth URL:", error);
    }
  };

  const handleInstagramOAuth = async () => {
    try {
      alert("Instagram is not yet supported");
      // const { data } = (await client.query({
      //   query: InstagramAuthUrlDocument,
      // })) as InstagramAuthUrlQueryResult;
      // console.log(data);
      // window.location.href = data?.instagramAuthUrl || "";
    } catch (error) {
      console.error("Failed to get Instagram auth URL:", error);
    }
  };

  const handleFacebookOAuth = async () => {
    try {
      alert("Facebook is not yet supported");
      // const { data } = (await client.query({
      //   query: FacebookAuthUrlDocument,
      // })) as FacebookAuthUrlQueryResult;
      // console.log(data);
      // window.location.href = data?.facebookAuthUrl || "";
    } catch (error) {
      console.error("Failed to get Facebook auth URL:", error);
    }
  };

  const handleXOAuth = async () => {
    try {
      alert("X is not yet supported");
      // const { data } = (await client.query({
      //   query: XAuthUrlDocument,
      // })) as XAuthUrlQueryResult;
      // console.log(data);
      // window.location.href = data?.xAuthUrl || "";
    } catch (error) {
      console.error("Failed to get X auth URL:", error);
    }
  };

  return (
    <div className="account-links-section">
      {notification && (
        <Toast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="section-content">
        <h2>Social Media Links</h2>
        <p>Add and manage your social media profile links</p>

        <div className="links-container">
          {socialPlatforms
            .sort((a, b) => {
              const getConnectedStatus = (platform: string) => {
                switch (platform) {
                  case "YOUTUBE":
                    return youtubeConnected;
                  case "TIK_TOK":
                    return tiktokConnected;
                  case "INSTAGRAM":
                    return instagramConnected;
                  case "FACEBOOK":
                    return facebookConnected;
                  case "X":
                    return xConnected;
                  default:
                    return false;
                }
              };

              const aConnected = getConnectedStatus(a.value);
              const bConnected = getConnectedStatus(b.value);

              // Connected accounts first
              if (aConnected && !bConnected) return -1;
              if (!aConnected && bConnected) return 1;

              // Maintain original order for accounts with same connection status
              return 0;
            })
            .map((platform) => {
              // const existingLink = accountLinks[platform.value];

              const getConnectedStatus = (platform: string) => {
                switch (platform) {
                  case "YOUTUBE":
                    return youtubeConnected;
                  case "TIK_TOK":
                    return tiktokConnected;
                  case "INSTAGRAM":
                    return instagramConnected;
                  case "FACEBOOK":
                    return facebookConnected;
                  case "X":
                    return xConnected;
                  default:
                    return false;
                }
              };

              const isConnected = getConnectedStatus(platform.value);

              return (
                <div
                  key={platform.value}
                  className={`link-item ${platform.value.toLowerCase()}-platform ${isConnected ? "connected" : ""}`}
                >
                  <div className="link-header">
                    <span className="platform-name">{platform.label}</span>
                  </div>

                  <div className="link-display">
                    {isConnected ? (
                      <div
                        className={`connected-status ${platform.value.toLowerCase()}-connected`}
                      >
                        <div className="connected-info">
                          <div className="connected-badge">
                            <span className="connected-icon">✓</span>
                            <span className="connected-text">Connected</span>
                          </div>
                          <span className="connected-description">
                            Your {platform.label} account is linked
                          </span>
                        </div>
                        <div className="connected-actions">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              switch (platform.value) {
                                case "YOUTUBE":
                                  handleYouTubeOAuth();
                                  break;
                                case "TIK_TOK":
                                  handleTikTokOAuth();
                                  break;
                                case "INSTAGRAM":
                                  handleInstagramOAuth();
                                  break;
                                case "FACEBOOK":
                                  handleFacebookOAuth();
                                  break;
                                case "X":
                                  handleXOAuth();
                                  break;
                              }
                            }}
                            extraClasses="reconnect-btn"
                          >
                            Reconnect
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          switch (platform.value) {
                            case "YOUTUBE":
                              handleYouTubeOAuth();
                              break;
                            case "TIK_TOK":
                              handleTikTokOAuth();
                              break;
                            case "INSTAGRAM":
                              handleInstagramOAuth();
                              break;
                            case "FACEBOOK":
                              handleFacebookOAuth();
                              break;
                            case "X":
                              handleXOAuth();
                              break;
                          }
                        }}
                        extraClasses="add-link-btn"
                      >
                        Connect {platform.label}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AccountLinks;
