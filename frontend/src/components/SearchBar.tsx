import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { RefreshCcw, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, placeHolder, onReset, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3   justify-between flex-row border-2 rounded-full p-2 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={25}
          className="ml-1 text-red-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none md:text-[15px] md:text-xl   focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* {form.formState.isDirty && (
          
        )} */}
     
        <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full md:block hidden"
            
          >
            Reset 
          </Button>
          <div  className="hidden md:block">
        <Button type="submit" className="rounded-full bg-red-500">
        Search
        </Button>
        </div>
        <div className="md:hidden block">
        <Button variant={null} type="submit" >
        <Search
          strokeWidth={2.5}
          size={25}
          className="ml-1 text-red-500 md:hidden"
        />
        </Button>
        </div>
        
      </form>
    </Form>
  );
};

export default SearchBar;
