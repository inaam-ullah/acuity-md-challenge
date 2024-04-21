# Handling Multiple Strategies

## Approach

To handle multiple strategies, we need to refactor the API to accept an array of strategies and combine their results. Here's the approach:

### 1. Accept Multiple Strategies
Modify the query parameter to accept an array of strategies. Instead of a single `strategy` parameter, the API should accept a `strategies` parameter that can take multiple values. This can be achieved by using a comma-separated list in the query string. For example:

`/api/healthcare-professionals/top?strategies=elephant,upsell`

This allows the client to specify multiple strategies that will be used to evaluate the healthcare professionals (HCPs).

### 2. Calculate Scores for Each Strategy
For each strategy specified in the `strategies` query parameter, implement individual functions to calculate the score based on that strategy. Here’s how:
- **Elephant Strategy:** Calculate the gap between the number of procedures performed and the number of devices sold for each HCP.
- **Upsell Strategy:** Calculate the score based on existing sales relationships, considering how familiar the HCPs are with the device.
Each function will produce a score that indicates the potential for selling more devices to that HCP.

### 3. Combine Scores
Since different strategies might produce scores on different scales, normalize the scores to a common scale (e.g., 0 to 1) to ensure fair combination. Once normalized, combine the scores from different strategies using a method that makes sense for the application, such as a weighted average. For example:
- **Equal Weights:** If no weights are provided, assume equal importance for all strategies:

`combined_score = (score_elephant + score_upsell) / 2`

- **Custom Weights:** Allow users to specify weights for each strategy to adjust their importance in the final score:

`combined_score = weight_elephant * score_elephant + weight_upsell * score_upsell`


### 4. Sort and Return Results
After calculating the combined scores for each HCP:
- **Sort HCPs:** Sort HCPs in descending order based on their combined scores.
- **Tiebreaker:** If two HCPs have the same combined score, use the HCP ID in ascending order as a tiebreaker to ensure consistent ordering.
Return the top HCPs based on the `limit` parameter specified in the query string.

## Additional Query Parameters

### `weights`
Allow users to specify weights for each strategy to adjust their importance in the final score. This parameter can be passed as a comma-separated list corresponding to the strategies. For example:


`/api/healthcare-professionals/top?strategies=elephant,upsell&weights=0.7,0.3`

In this example, the elephant strategy has a weight of 0.7, and the upsell strategy has a weight of 0.3.

### `threshold`
Define a minimum score threshold to filter HCPs. This ensures that only HCPs with a combined score above a certain threshold are returned. For example:

`/api/healthcare-professionals/top?strategies=elephant,upsell&threshold=0.5`

In this example, only HCPs with a combined score greater than or equal to 0.5 will be included in the results.

## Summary
By implementing the above approach, we can create a flexible and generalizable API that caters to multiple strategies. This modular and scalable design allows for easy addition of new strategies and fine-tuning of the importance of each strategy through weights. The main steps are:

1. Modify the API to accept multiple strategies.
2. Implement and normalize score calculations for each strategy.
3. Combine the normalized scores.
4. Sort and filter the HCPs based on the combined scores and any additional parameters such as weights and thresholds.
