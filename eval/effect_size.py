import math

PUBLISHED_COHENS_D_BENCHMARK = 0.936

def calculate_cohens_d(m1, s1, n1, m2, s2, n2):
    df = n1 + n2 - 2
    pooled_var = ((n1 - 1)*(s1**2) + (n2 - 1)*(s2**2)) / max(df, 1)
    s_pooled = math.sqrt(pooled_var) if pooled_var > 0 else 1.0
    d = (m1 - m2) / s_pooled
    se = math.sqrt((n1 + n2)/(n1 * n2) + (d**2)/(2*(n1 + n2)))
    ci_low, ci_high = round(d - 1.96*se, 3), round(d + 1.96*se, 3)
    z = d / math.sqrt(2.0)
    cles = round(0.5 * (1.0 + math.erf(z / math.sqrt(2.0))) * 100.0, 1)
    interp = "Large effect size" if abs(d) >= 0.8 else ("Medium effect size" if abs(d) >= 0.5 else "Small effect size")
    return {"cohens_d": round(d, 3), "interpretation": interp, "ci_95": [ci_low, ci_high], "common_language_effect_size_pct": cles, "meets_benchmark": d >= PUBLISHED_COHENS_D_BENCHMARK}
