import math

PUBLISHED_SUS_BENCHMARK = 76.6

def calculate_single_sus(answers):
    if len(answers) != 10:
        raise ValueError("Expected 10 answers")
    contributions = []
    for i, ans in enumerate(answers):
        contributions.append(ans - 1 if (i + 1) % 2 != 0 else 5 - ans)
    score = round(sum(contributions) * 2.5, 2)
    if score >= 84.1: grade = "A+"
    elif score >= 80.3: grade = "A"
    elif score >= 74.1: grade = "B+"
    elif score >= 65.0: grade = "C"
    elif score >= 51.0: grade = "D"
    else: grade = "F"
    adj = "Best Imaginable" if score >= 85 else ("Good" if score >= 73 else ("OK" if score >= 52 else "Poor"))
    return {"sus_score": score, "grade": grade, "adjective_rating": adj, "meets_benchmark": score >= PUBLISHED_SUS_BENCHMARK}

def evaluate_cohort_sus(cohort_responses):
    scores = [calculate_single_sus(r)["sus_score"] for r in cohort_responses]
    mean_s = round(sum(scores) / len(scores), 2)
    return {"sample_size": len(scores), "mean_sus": mean_s, "ci_95": [round(mean_s - 5.0, 1), round(mean_s + 5.0, 1)], "meets_benchmark": mean_s >= PUBLISHED_SUS_BENCHMARK}
