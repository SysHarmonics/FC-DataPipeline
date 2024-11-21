import axios from 'axios';

export default async function lambdaSearch(sku, context = () => {}) {
    const url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.14.3)%3B%20Browser%20(lite)%3B%20JS%20Helper%20(3.11.1)%3B%20react%20(18.2.0)%3B%20react-instantsearch%20(6.38.1)&x-algolia-api-key=10cf0ae11ca33a8c7c80a8c6bd926bdf&x-algolia-application-id=2FWOTDVM2O";

    var options = {
        url: "https://2fwotdvm2o-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.14.3)%3B%20Browser%20(lite)%3B%20JS%20Helper%20(3.11.1)%3B%20react%20(18.2.0)%3B%20react-instantsearch%20(6.38.1)&x-algolia-api-key=10cf0ae11ca33a8c7c80a8c6bd926bdf&x-algolia-application-id=2FWOTDVM2O",
        data: `{
            "requests": [{
                "indexName": "product_variants_v2_flight_club",
                "params": "distinct=true&facets=%5B%5D&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&highlightPreTag=%3Cais-highlight-0000000000%3E&hitsPerPage=10&query=${sku}&tagFilters="
            }]
        }`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; rv:20.0) Gecko/20121202 Firefox/20.0'
        }
    };
    try {
        const response = await axios.post(url, options.data, {headers: options.headers });
        if (response.data && response.data.results && response.data.results[0]) {
            const hits = response.data.results[0].hits;
            if (hits && hits.length > 0) {

               const { name, story: description, sku, product_taxonomy: { lvl0: branding} , color, original_picture_url: imageURL, size_range: sizeRange } = hits[0];
                /*  
                const Name = hits[0].name;
                const branding = hits[0].product_taxonomy.lvl0;
                const color = hits[0].color;
                const imageURL = hits[0].original_picture_url;
                const sizeRange = hits[0].size_range;
                const searchSku = hits[0].sku
                const description = hits[0].story;
                */

                let sneaker = { 
                    name,
                    description,
                    sku,
                    branding,
                    color,
                    imageURL,
                    sizeRange
                 }

                Object.keys(sneaker).forEach(key => {
                    console.log(key + ": " + sneaker[key]);
                })

               // console.log("", description);
            }
            // console.log("Search Results Hits:", hits);
            // context(null, hits);
        }
    } catch (error) {
            if (!error.response) {
                let err = new Error(`Could not connect to Flight Club while searching for ${sku}.` + "Error:", error);
                console.error(err);
                context(err);
            } else {
                let statusCode = error.response.status;
                let err = new Error(`Could not connect to Flight Club while searching for ${sku} - Status Code: ${statusCode}`);
                console.error(err);
                context(err)
            }
        }  
}


lambdaSearch("hq4540");
