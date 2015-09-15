function _{{settings.program}}_completion {

  # the current word we're trying to complete
  local input="${COMP_WORDS[COMP_CWORD]}"
  local comps=""

  if [[ "$COMP_CWORD" -eq 1 ]]; then
    # complete the list of subcommands
    comps="$({{settings.program}} --commands)"
  else
    # per-command completion
    comps="$(sh -c "$COMP_LINE --complete")"
  fi

  COMPREPLY=($(compgen -W "$comps" -- "$input" ))
}

complete -F _{{settings.program}}_completion {{settings.program}}
