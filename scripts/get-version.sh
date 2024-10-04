#!/bin/bash

package_json_path=$1

version=$(jq -r '.version' "$package_json_path")

echo "$version"
