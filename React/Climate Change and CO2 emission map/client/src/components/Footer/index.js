import React from 'react';
import './style.css';

/**
 * React functional component representing the footer of the website.
 *
 * @returns {JSX.Element} The JSX representation of the footer.
 * @component
 */
function Footer() {
  return (
    <footer>
      <div className="footer-header">
        <img loading="lazy" id="logo" src="./logo.jpg" alt="Greenhouse" />
        <h3>Climate Changes & CO₂ Emissions</h3>
      </div>
      <div className="footer-info">
        <p>
          The purpose of this website is to demonstrate the increase of the
          temperature change and CO₂ gaz emission global rates on the global
          views. We have implemented a choropleth map to visualize the quantity
          of CO₂ gaz emission and the temperature change in 225 countries. (See
          Map View) We have implemented a chart to visualize the quantity of CO₂
          gaz emission and the temperature change rate over years for all
          countries (See Chart View)
        </p>
        <p>
          <i>
            People working on this website are dedicated to have a positive
            impact on the planet. This website affirms our mission to drive
            social and environmental change on a global scale.
          </i>
        </p>
        <p>
          This website is maintained and powered by Shuya Liu, Mohamed Loutfi
          and Anastasia Bondarenko
        </p>
        <p>
          <i>data resources:</i>
        </p>
        <div id="mentions">
          <a href="https://climatedata.imf.org/datasets/4063314923d74187be9596f10d034914/explore"
            target="_blank" rel="noreferrer">
            Temperature Change
          </a>
          <a href="https://github.com/owid/co2-data/blob/master/owid-co2-data.csv"
            target="_blank" rel="noreferrer">
            CO₂ gaz emission
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
