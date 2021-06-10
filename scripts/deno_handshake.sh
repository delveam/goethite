# The following script is meant to help convert the project's
# `src` directory into a compliant Deno module. It works hand
# in hand with this project's Makefile.

# The current rule's target and dependency are passed along
# to this script as the first and second command
# line argument respectively.
target=$1
dependency=$2

# Copy the dependency from src to the `deno` directory.
cp $dependency deno

# deno's style guide suggests using `mod.ts` instead of
# `index.ts` for your module's default entry point.
if [ "$target" == "deno/index.ts" ]; then
	mv $target deno/mod.ts
	target=deno/mod.ts
fi

# `.js` files do no exist in the `src` directory; Deno will
# not be able to import anything unless we change our
# project's imports to use the `.ts` extension.
#
# This method will NOT always work. If anyone knows of a
# better way to do this then please submit a pull request.
sed -i 's/.js";$/.ts";/' $target
