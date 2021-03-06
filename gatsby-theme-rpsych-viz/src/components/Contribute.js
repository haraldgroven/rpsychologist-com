import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import BuyMeACoffee from "./BuyMeACoffee";
import { useTranslation, Trans } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  sponsors: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const Contribute = React.memo(() => {
  const classes = useStyles();
  const { t } = useTranslation("blog");
  return (
    <div>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        {t("Contribute/Donate")}
      </Typography>
      <Typography variant="body1" paragraph>
        {t("Many ways to contribute")}
      </Typography>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <BuyMeACoffee />
      </Grid>
      <Typography variant="body1" paragraph style={{ marginTop: "1em" }}>
        <Trans i18nKey="contributeGitHub" t={t}>
          Pull requests are also welcome, or you can contribute by suggesting
          new features, add useful references, or help fix typos. Just open a
          issues on{" "}
          <Link href="https://github.com/rpsychologist/rpsychologist-com">
            GitHub
          </Link>
          .
        </Trans>
      </Typography>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        {t("Sponsors")}
      </Typography>
      <div>
        <Typography variant="body1" paragraph>
        <Trans i18nKey="GitHubSponsors" t={t}>
          You can sponsor my open source work using{" "}
          <Link href="https://github.com/sponsors/rpsychologist">
            GitHub Sponsors
          </Link>{" "}
          and have your name shown here.
        </Trans>
        </Typography>
        <Typography variant="body2" paragraph align="center">
          {t("Backers")} ✨
        </Typography>
        <Grid className={classes.sponsors}>
          <Chip label={t("Your Name")} />
          <Chip
            label={t("Your Name")}
            color="primary"
            icon={<HomeRoundedIcon fontSize="small" color="primary" />}
            clickable
            component={Link}
            href="https://github.com/sponsors/rpsychologist"
          />
        </Grid>
      </div>
    </div>
  );
});
export default Contribute;
