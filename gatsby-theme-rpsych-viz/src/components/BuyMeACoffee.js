import React, { useState, createRef } from "react";
import clsx from "clsx";
import { useStaticQuery, graphql } from "gatsby";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MuiLink from "@material-ui/core/Link";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useTranslation, Trans } from "react-i18next"

const useStyles = makeStyles((theme) => ({
  note: {
    background: "#1e88e50d",
    borderColor: "#1e88e53b",
  },
  truncatedArea: {
    overflow: "hidden",
    maxHeight: "500px",
    maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
  },
  expandedArea: {
    maxHeight: "100%",
  },
  showMoreButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-3em",
    marginBottom: "3em",
  },
  showMoreButtonExpanded: {
    marginTop: "0em",
  },
}));

const CoffeButton = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: "700",
    color: "white",
    backgroundColor:
      theme.palette.type === "light" ? "black" : "rgb(255, 129, 63)",
    "&:hover": {
      backgroundColor:
        theme.palette.type === "light" ? "rgb(255, 129, 63)" : "black",
    },
  },
}))(Button);

const PayPalButton = withStyles(() => ({
  root: {
    textTransform: "none",
    fontWeight: "700",
  },
}))(Button);

const BuyMeACoffee = React.memo(() => {
  const classes = useStyles();
  const [showAllComments, setShowAllComments] = useState(false);
  const { t } = useTranslation("blog")
  const ref = createRef();
  const { allCoffeeSupportersJson } = useStaticQuery(coffeeSupportersQuery);
  const totalNumCoffees = allCoffeeSupportersJson.edges
    .map((c) => c.node.support_coffees)
    .reduce((total, x) => total + x);
  const numSupporters = allCoffeeSupportersJson.edges.length
  return (
    <>
      <Grid item xs={12}>
        <CoffeButton
          variant="contained"
          color="primary"
          href="https://www.buymeacoffee.com/krstoffr"
          size="large"
        >
          {t("Buy Me a Coffee")} ☕
        </CoffeButton>
      </Grid>
      <Grid item xs={12}>
        <PayPalButton color="primary" href="https://www.paypal.me/krstoffr">
          {t("(or use PayPal)")}
        </PayPalButton>
      </Grid>
      <Grid item xs={12}>
        <Typography variand="body1" align="center">
          <Trans
            i18nKey="coffeSupportersThanks"
            t={t}
            numSupporters={numSupporters}
            totalNumCoffees={totalNumCoffees}
          >
            A huge thanks to the{" "}
            <Typography component="span" color="primary">
              <strong>{{ numSupporters }}</strong>
            </Typography>{" "}
            supporters who've bought me a{" "}
            <Typography component="span" color="primary">
              <strong>{{ totalNumCoffees }}</strong>
            </Typography>{" "}
            coffees!
          </Trans>
        </Typography>
        <div
          ref={ref}
          className={clsx({
            [classes.truncatedArea]: showAllComments === false,
            [classes.expandedArea]: showAllComments === true,
          })}
        >
          {allCoffeeSupportersJson.edges.map((c, i) => {
            const name = c.node.payer_name;
            const hasTwitter = name.charAt(0) == "@";
            return (
              <div key={i}>
                <p>
                  <Typography
                    component="span"
                    variant="body1"
                    style={{ fontWeight: 500 }}
                  >
                    {" "}
                    {name == "" ? (
                      "Someone"
                    ) : hasTwitter ? (
                      <MuiLink
                      tabIndex={!showAllComments && "-1"}
                        href={`https://twitter.com/${name.substring(1)}`}
                        rel="nofollow noopener"
                      >
                        {name}
                      </MuiLink>
                    ) : (
                      name
                    )}
                  </Typography>{" "}
                  {t("bought")} {"☕".repeat(c.node.support_coffees)} (
                  {c.node.support_coffees})
                  {c.node.support_coffees == 1 ? ` ${t("coffee")}` : ` ${t("coffees")}`}
                </p>
                {c.node.support_note != null && c.node.support_note != "" && (
                  <Card
                    className={classes.note}
                    variant="outlined"
                    color="primary"
                  >
                    <CardContent>
                      <Typography variant="body2" lang="en">
                        {c.node.support_note}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
        <div
          className={clsx({
            [classes.showMoreButton]: true,
            [classes.showMoreButtonExpanded]: showAllComments === true,
          })}
        >
          <Button
            onClick={() => {
              setShowAllComments(!showAllComments);
              if (showAllComments) ref.current.scrollIntoView();
            }}
            variant="contained"
            color="primary"
          >
            {showAllComments ? t("Hide") : t("Show all")}
          </Button>
        </div>
      </Grid>
    </>
  );
});
export default BuyMeACoffee;

const coffeeSupportersQuery = graphql`
  query {
    allCoffeeSupportersJson {
      edges {
        node {
          supporter_name
          payer_name
          support_note
          support_coffees
        }
      }
    }
  }
`;
