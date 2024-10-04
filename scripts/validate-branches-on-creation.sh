#!/bin/bash

branch_name="$1"

if [[ "$branch_name" =~ ^refs/heads/feature/[^/]+$ || "$branch_name" =~ ^refs/heads/feature/[^/_]+_[^/_]+$ ]]; then
    exit 0
else
    exit 1
fi
