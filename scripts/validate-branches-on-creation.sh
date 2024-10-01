#!/bin/bash

branch_name="$1"

if [[ "$branch_name" =~ ^feature/[^/]+$ || "$branch_name" =~ ^feature/[^/_]+_[^/_]+$ ]]; then
    exit 0
else
    exit 1
fi
