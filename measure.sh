#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title measure
# @raycast.mode silent

# Optional parameters:
# @raycast.icon lighthouse.png
# @raycast.argument1 { "type": "text", "placeholder": "URL" }

# Documentation:
# @raycast.description Opens PageSpeed Insights measurement with a URL

# from https://stackoverflow.com/questions/296536/how-to-urlencode-data-for-curl-command
rawurlencode() {
	local string="${1}"
	local strlen=${#string}
	local encoded=""
	local pos c o

	for ((pos = 0; pos < strlen; pos++)); do
		c=${string:$pos:1}
		case "$c" in
		[-_.~a-zA-Z0-9]) o="${c}" ;;
		*) printf -v o '%%%02x' "'$c" ;;
		esac
		encoded+="${o}"
	done
	echo "${encoded}"  # You can either set a return variable (FASTER)
	REPLY="${encoded}" #+or echo the result (EASIER)... or both... :p
}

open "https://pagespeed.web.dev/report?url=$(rawurlencode "$1")"
