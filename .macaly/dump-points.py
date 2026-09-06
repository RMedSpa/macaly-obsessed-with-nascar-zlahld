#!/usr/bin/env python3
import json, sys, urllib.request

urls = sys.argv[1:] or ["https://cf.nascar.com/cacher/2026/1/points-feed.json"]
for url in urls:
    print("===== ", url)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=20) as res:
        rows = json.loads(res.read().decode())
    print("count", len(rows))
    if not rows:
        continue
    print("KEYS", sorted(rows[0].keys()))
    print(
        f"{'pos':>3} {'car':>3} {'driver':<24} {'pts':>5} {'earn':>4} {'w':>2} {'s1':>2} {'s2':>2} {'stPts':>5} {'pol':>3} {'t5':>3} {'t10':>3} {'st':>3} {'led':>5} {'mfr':<10} {'dl':>5} {'dn':>5}"
    )
    for r in rows[:30]:
        print(
            f"{r.get('position', 0):>3} {str(r.get('car_no', '')):>3} {str(r.get('driver_name', ''))[:24]:<24} {r.get('points', 0):>5} {r.get('points_earned', 0):>4} {r.get('wins', 0):>2} {r.get('stage_1_wins', 0):>2} {r.get('stage_2_wins', 0):>2} {r.get('stage_points', 0):>5} {r.get('poles', 0):>3} {r.get('top_5', 0):>3} {r.get('top_10', 0):>3} {r.get('starts', 0):>3} {r.get('laps_led', 0):>5} {str(r.get('manufacturer', ''))[:10]:<10} {r.get('delta_leader', 0):>5} {r.get('delta_next', 0):>5}"
        )
    print("--- row0 extras ---")
    for k in sorted(rows[0]):
        print(k, rows[0][k])
    print()
